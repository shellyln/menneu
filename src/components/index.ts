// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import * as RedAgate    from 'red-agate/modules';
import * as barcodes    from 'red-agate-barcode/modules';
import * as RaReactHost from 'red-agate-react-host/modules';
import { Markdown }     from './Markdown';
import { Math,
         Mml }          from './Math';
import { PlantUml,
         PlantUmlLite } from './PlantUml';
import { Chart }        from './Chart';
import { RawHtml }      from './RawHtml';
import { NormalizeCss,
         MarkdownCss,
         HighlightCss,
         PaperCss }     from './styles';



export const components = {
    Do: RedAgate.Do,
    Facet: RedAgate.Facet,
    Asset: RedAgate.Asset,
    Image: RedAgate.Image,
    Script: RedAgate.Script,
    Style: RedAgate.Style,
    Font: RedAgate.Font,
    SingleFont: RedAgate.SingleFont,
    Html4_01_Strict: RedAgate.Html4_01_Strict,
    Html4_01_Transitional: RedAgate.Html4_01_Transitional,
    Html4_01_Frameset: RedAgate.Html4_01_Frameset,
    Xhtml1_0_Strict: RedAgate.Xhtml1_0_Strict,
    Xhtml1_0_Transitional: RedAgate.Xhtml1_0_Transitional,
    Xhtml1_0_Frameset: RedAgate.Xhtml1_0_Frameset,
    Html5: RedAgate.Html5,
    Xml: RedAgate.Xml,
    HtmlImposition: RedAgate.HtmlImposition,
    Svg: RedAgate.Svg,
    Ambient: RedAgate.Ambient,
    Arc: RedAgate.Arc,
    Canvas: RedAgate.Canvas,
    Circle: RedAgate.Circle,
    Curve: RedAgate.Curve,
    GridLine: RedAgate.GridLine,
    Group: RedAgate.Group,
    Line: RedAgate.Line,
    Path: RedAgate.Path,
    Pie: RedAgate.Pie,
    Polygon: RedAgate.Polygon,
    Rect: RedAgate.Rect,
    RoundRect: RedAgate.RoundRect,
    SvgAssetFragment: RedAgate.SvgAssetFragment,
    SvgFragment: RedAgate.SvgFragment,
    Text: RedAgate.Text,
    SvgImposition: RedAgate.SvgImposition,
    PrinterMarks: RedAgate.PrinterMarks,
    Code128: barcodes.Code128,
    Code39: barcodes.Code39,
    Ean13: barcodes.Ean13,
    Ean8: barcodes.Ean8,
    Ean5: barcodes.Ean5,
    Ean2: barcodes.Ean2,
    UpcA: barcodes.UpcA,
    UpcE: barcodes.UpcE,
    Itf: barcodes.Itf,
    JapanPostal: barcodes.JapanPostal,
    Nw7: barcodes.Nw7,
    Qr: barcodes.Qr,
    Markdown,
    Math,
    Mml,
    PlantUml,
    PlantUmlLite,
    Chart,
    RawHtml,
    NormalizeCss,
    MarkdownCss,
    HighlightCss,
    PaperCss,
};


export const extraComponents = {
    Repeat: RedAgate.Repeat,
    ForEach: RedAgate.ForEach,
    If: RedAgate.If,
    ReactHost: RaReactHost.ReactHost,
};
