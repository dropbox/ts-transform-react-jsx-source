/**
 * This plugin works the same way as
 * https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source
 * which inject __source={{ fileName, lineNumber }} into
 * every React Element so React can debug
 * Ref: https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/shared/describeComponentFrame.js#L35
 */
import * as TYPESCRIPT from 'typescript'

function nodeVisitor(ts: typeof TYPESCRIPT, ctx: TYPESCRIPT.TransformationContext, sf: TYPESCRIPT.SourceFile) {
    let sourceJsxAttr: TYPESCRIPT.JsxAttributeLike | undefined
    const visitor: TYPESCRIPT.Visitor = (node) => {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
            // Create fileName attr
            const fileNameAttr = ts.createPropertyAssignment('fileName', ts.createStringLiteral(sf.fileName))
            // Create lineNumber attr
            const lineNumberAttr = ts.createPropertyAssignment(
                'lineNumber',
                ts.createNumericLiteral(`${sf.getLineAndCharacterOfPosition(node.pos).line + 1}`)
            )

            // Create __source={{fileName, lineNumber}} JSX Attribute
            sourceJsxAttr = ts.createJsxAttribute(
                ts.createIdentifier('__source'),
                ts.createJsxExpression(undefined, ts.createObjectLiteral([fileNameAttr, lineNumberAttr]))
            )
        }
        else if (ts.isJsxAttributes(node) && sourceJsxAttr) {
            const attrs = [...node.properties, sourceJsxAttr]
            sourceJsxAttr = undefined
            return ctx.factory.updateJsxAttributes(node, attrs)
        }
        return ts.visitEachChild(node, visitor, ctx)
    }
    return visitor
}

export function transform(ts: typeof TYPESCRIPT = TYPESCRIPT): TYPESCRIPT.TransformerFactory<TYPESCRIPT.SourceFile> {
    return (ctx) => (sf) => ts.visitNode(sf, nodeVisitor(ts, ctx, sf))
}
