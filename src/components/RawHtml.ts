// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import * as rdgt from 'red-agate/modules';



export class RawHtml extends rdgt.RedAgateComponent<rdgt.ComponentProps> {
    constructor(props: rdgt.ComponentProps) {
        super(props);
    }

    public transform(): rdgt.RedAgateNode {
        return this.props.children;
    }

    public render(contexts: Map<string, any>, children: string) {
        return (children
            .replace(/&amp;/g, '&')
            .replace(/&#38;/g, '&')
            .replace(/&gt;/g, '>')
            .replace(/&#62;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&#60;/g, '<')
            .replace(/&quot;/g, '"')
            .replace(/&#34;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/&#39;/g, "'")
            .trim()
        );
    }
}
