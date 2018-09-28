// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import * as rdgt from 'red-agate/modules';
import { raw }   from './raw';



export class RawHtml extends rdgt.RedAgateComponent<rdgt.ComponentProps> {
    constructor(props: rdgt.ComponentProps) {
        super(props);
    }

    public transform(): rdgt.RedAgateNode {
        return raw(this.props.children);
    }

    public render(contexts: Map<string, any>, children: string) {
        return (children.trim());
    }
}
