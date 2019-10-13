import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as JsBarcode from "jsbarcode";

export class BarcodeGenerator implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _barCodeValue: string;
	private _format: string;
	private _text: string;
	private _fontOptions: string;
	private _width: number;
	private _height: number;
	private _displayValue: number;
	private _font: string;
	private _textAlign: string;
	private _textPosition: string;
	private _fontSize: number;
	private _backgroundColor: string;
	private _lineColor: string;
	private _textMargin: number;
	private _margin: number;
	private _marginTop: number;
	private _marginBottom: number;
	private _marginLeft: number;
	private _marginRight: number;
	private _flat: number;
	private _formatValid: string[] = ["EAN13", "UPC", "EAN8", "EAN5", "EAN2", "CODE128", "CODE128A", "CODE128B", "CODE128C", "CODE39", "ITF14", "MSI", "MSI10", "MSI11", "MSI1010", "MSI1110", "pharmacode", "codabar"];
	private _isValid: boolean = true;


	private _container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _imageBarCode: HTMLElement;
	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._context = context;
		this._container = container;
		this._container = document.createElement("div");
		container.appendChild(this._container);
		this.GetAllParameters();
		this._isValid = this.CheckParametersAreValids();
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this.RemoveChildItems();
		if (this._isValid) {
			this._imageBarCode = document.createElement("img");
			let cssId: number = Math.floor(Math.random() * (1000 - 0));
			this._imageBarCode.id = "barcode"+cssId;
			this._container.appendChild(this._imageBarCode);
			try {
				JsBarcode("#barcode"+cssId, this._barCodeValue, {
					format: this._format,
					width: this._width,
					height: this._height,
					displayValue: this._displayValue == 1 ? true : false,
					text: this._text.length > 0 ? this._text : this._barCodeValue,
					fontOptions: this._fontOptions,
					font: this._font,
					textAlign: this._textAlign,
					textPosition: this._textPosition,
					textMargin: this._textMargin,
					fontSize: this._fontSize,
					background: this._backgroundColor,
					lineColor: this._lineColor,
					margin: this._margin,
					marginTop: this._marginTop,
					marginBottom: this._marginBottom,
					marginLeft: this._marginLeft,
					marginRight: this._marginRight,
					flat: this._flat == 1 ? true : false,
				});
			} catch (error) {
				console.log("[BARCODE] Error when trying to render the barcode : " + error)
			}
		}
	}
	/**
 * Used to get all parameters.
 */
	private GetAllParameters(): void {

		this._barCodeValue = this._context.parameters.barCodeValue == undefined || this._context.parameters.barCodeValue.raw == null ? "EAN13" : this._context.parameters.barCodeValue.raw;
		this._format = this._context.parameters.format == undefined || this._context.parameters.format.raw == null ? "EAN13" : this._context.parameters.format.raw;
		this._width = this._context.parameters.width == undefined || this._context.parameters.width.raw == null ? 2 : this._context.parameters.width.raw;
		this._height = this._context.parameters.height == undefined || this._context.parameters.height.raw == null ? 100 : this._context.parameters.height.raw;
		this._text = this._context.parameters.text == undefined || this._context.parameters.text.raw == null ? "" : this._context.parameters.text.raw;
		this._fontOptions = this._context.parameters.fontOptions == undefined || this._context.parameters.fontOptions.raw == null ? "" : this._context.parameters.fontOptions.raw;
		this._displayValue = this._context.parameters.displayValue == undefined || this._context.parameters.displayValue.raw == null ? 1 : this._context.parameters.displayValue.raw;
		this._font = this._context.parameters.font == undefined || this._context.parameters.font.raw == null ? "monospace" : this._context.parameters.font.raw;
		this._textAlign = this._context.parameters.textAlign == undefined || this._context.parameters.textAlign.raw == null ? "center" : this._context.parameters.textAlign.raw;
		this._textPosition = this._context.parameters.textPosition == undefined || this._context.parameters.textPosition.raw == null ? "bottom" : this._context.parameters.textPosition.raw;
		this._textMargin = this._context.parameters.textMargin == undefined || this._context.parameters.textMargin.raw == null ? 2 : this._context.parameters.textMargin.raw;
		this._fontSize = this._context.parameters.fontSize == undefined || this._context.parameters.fontSize.raw == null ? 20 : this._context.parameters.fontSize.raw;
		this._backgroundColor = this._context.parameters.backgroundColor == undefined || this._context.parameters.backgroundColor.raw == null ? "#fcba03" : this._context.parameters.backgroundColor.raw;
		this._lineColor = this._context.parameters.lineColor == undefined || this._context.parameters.lineColor.raw == null ? "#000000" : this._context.parameters.lineColor.raw;
		this._fontSize = this._context.parameters.fontSize == undefined || this._context.parameters.fontSize.raw == null ? 20 : this._context.parameters.fontSize.raw;
		this._margin = this._context.parameters.margin == undefined || this._context.parameters.margin.raw == null ? 10 : this._context.parameters.margin.raw;
		this._marginTop = this._context.parameters.marginTop == undefined || this._context.parameters.marginTop.raw == null ? 0 : this._context.parameters.marginTop.raw;
		this._marginBottom = this._context.parameters.marginBottom == undefined || this._context.parameters.marginBottom.raw == null ? 0 : this._context.parameters.marginBottom.raw;
		this._marginLeft = this._context.parameters.marginLeft == undefined || this._context.parameters.marginLeft.raw == null ? 0 : this._context.parameters.marginLeft.raw;
		this._marginRight = this._context.parameters.marginRight == undefined || this._context.parameters.marginRight.raw == null ? 0 : this._context.parameters.marginRight.raw;
		this._flat = this._context.parameters.flat == undefined || this._context.parameters.flat.raw == null ? 1 : this._context.parameters.flat.raw;

	}
	private CheckParametersAreValids(): boolean {
		if (this._formatValid.indexOf(this._format) < 0)
			return false;
		else
			return true;
	}
	/**
	 * Used to remove child dom element.
	 */
	private RemoveChildItems() {
		while (this._container.firstChild) {
			this._container.removeChild(this._container.firstChild);
		}
	}
	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}