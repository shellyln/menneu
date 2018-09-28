// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln

import * as rdgt    from 'red-agate/modules';



export function raw(children: any): any {
    if (typeof children === 'string') {
        return rdgt.createElement(
            rdgt.Template,
            {dangerouslySetInnerHTML: {__html: children}}
        );
    } else if (Array.isArray(children)) {
        return (
            (children as any[])
            .map(x => typeof x === 'string' ?
                rdgt.createElement(
                    rdgt.Template,
                    {dangerouslySetInnerHTML: {__html: x}}
                ) : x)
        );
    } else if (children && children.type === rdgt.Facet) {
        return raw(children.children);
    } else {
        return children;
    }
}
