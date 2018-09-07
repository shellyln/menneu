// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


/** @jsx rdgt.createElement */
import * as rdgt    from 'red-agate/modules';
import { Markdown } from './Markdown';



export interface MathProps extends rdgt.ComponentProps {
    inline?: boolean;
}


export const Math = (props: MathProps) => (props.inline ?
    <Markdown inline>$${props.children}$$</Markdown> :
    <Markdown>$$${props.children}$$$</Markdown>
);


export const Mml = (props: rdgt.ComponentProps) =>
    <Markdown inline>$${props.children}$$</Markdown>;
