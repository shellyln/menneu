// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


/** @jsx rdgt.createElement */
import * as rdgt    from 'red-agate/modules';
import { Markdown } from './Markdown';
import { raw }      from './raw';



export interface MathProps extends rdgt.ComponentProps {
    inline?: boolean;
}


export const Math = (props: MathProps) => (props.inline ?
    <Markdown inline>$${raw(props.children)}$$</Markdown> :
    <Markdown>$$${raw(props.children)}$$$</Markdown>
);


export const Mml = (props: rdgt.ComponentProps) =>
    <Markdown inline>$${raw(props.children)}$$</Markdown>;
