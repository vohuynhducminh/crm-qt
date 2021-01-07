import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  AfterContentInit,
  forwardRef,
  HostListener,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { tagAnimation } from 'src/app/@pages/animations/tag-animations';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { toBoolean } from 'src/app/@pages/components/util/convert';
import { DOWN_ARROW, ENTER, TAB } from '@angular/cdk/keycodes';

@Component({
  selector: 'crm-chip-input',
  encapsulation: ViewEncapsulation.None,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipInputComponent),
      multi      : true,
    },
  ],
  animations: [tagAnimation],
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
})
export class ChipInputComponent implements OnInit, AfterContentInit, ControlValueAccessor {

  // COPYCAT

  private _disabled = false;
  private _separator = ',';
  _el: HTMLElement;
  _prefixCls = 'pg-select';
  _classList: string[] = [];
  _composing = false;
  _searchText = '';
  _selectedOptions: Set<any> = new Set();
  _options: any[] = [];
  _value: string[];

  @ViewChild('searchInput') searchInputElementRef: ElementRef;

  // ngModel Access
  onChange: (value: string[]) => void = () => null;
  onTouched: () => void = () => null;
  // End ngModel Access

  @Input()
  set Disabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.setClassMap();
  }

  get Disabled(): boolean {
    return this._disabled;
  }

  // End COPYCAT

  @Input()
  set Separator(value: string) {
    this._separator = value;
  }

  get Separator(): string {
    return this._separator;
  }

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngAfterContentInit(): void {
    if (this._value != null) {
      this.flushComponentState();
    }
  }

  // COPYCAT

  compositionStart(): void {
    this._composing = true;
  }

  compositionEnd(): void {
    this._composing = false;
  }

  clearAllSelectedOption(emitChange: boolean = true): void {
    this._selectedOptions.forEach(item => {
      this.unSelectOption(item, null, emitChange);
    });
  }

  updateWidth(element: HTMLInputElement, text: string): void {
    if (text) {
      /** wait for scroll width change */
      setTimeout(_ => {
        this._renderer.setStyle(element, 'width', `${element.scrollWidth}px`);
      });
    } else {
      this._renderer.removeStyle(element, 'width');
    }
  }

  /** cancel select multiple option */
  unSelectOption = (option, $event?, emitChange = true) => {
    this._selectedOptions.delete(option);
    if (emitChange) {
      this.emitMultipleOptions();
    }
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  /** select multiple option */
  selectOption(option: any, $event?: MouseEvent): void {
    if (option) {
      this._selectedOptions.add(option);
      this.emitMultipleOptions();
    }
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  /** click dropdown option by user */
  toggleOption(option: any): void {
    if (!option) {
      return;
    }
    if (!this.isInSet(this._selectedOptions, option)) {
      this.selectOption(option);
    }
    this.clearSearchText();
  }

  /** update selected option when add remove option etc */
  updateSelectedOption(currentModelValue: string[], triggerByNgModel: boolean = false): void {
    if (currentModelValue == null) {
      return;
    }
    const selectedOptions = this._options.filter((item) => {
      return (item != null) && (currentModelValue.indexOf(item) !== -1);
    });
    if (!triggerByNgModel) {
      const _selectedOptions = Array.from(this._selectedOptions);
      selectedOptions.forEach(option => {
        const _exist = _selectedOptions.some(item => item === option);
        if (!_exist) {
          this._selectedOptions.add(option);
        }
      });
    } else {
      this._selectedOptions = new Set();
      selectedOptions.forEach(option => {
        this._selectedOptions.add(option);
      });
    }
  }

  forceUpdateSelectedOption(value: string[]): void {
    /** trigger dirty check */
    setTimeout(_ => {
      this.updateSelectedOption(value);
    });
  }

  /** determine if option in set */
  isInSet(set: Set<any>, option: any): any {
    return ((Array.from(set) as any[]).find((data: any) => data === option));
  }

  handleKeyEnterEvent(event: KeyboardEvent): void {
    /** when composing end */
    if (!this._composing) {
      event.preventDefault();
      event.stopPropagation();
      this.toggleOption(this._searchText);
    }
  }

  handleKeyBackspaceEvent(event: KeyboardEvent): void {
    if ((!this._searchText) && (!this._composing)) {
      event.preventDefault();
      const lastOption = Array.from(this._selectedOptions).pop();
      this.unSelectOption(lastOption);
    }
  }

  clearSearchText(): void {
    this._searchText = '';
  }

  /** emit multiple options */
  emitMultipleOptions(): void {
    const arrayOptions = Array.from(this._selectedOptions);
    this._value = arrayOptions;
  }

  flushComponentState(): void {
    if (this._value) {
      this.updateSelectedOption(this._value);
    }
  }

  setClassMap(): void {
    this._classList.forEach(_className => {
      this._renderer.removeClass(this._el, _className);
    });
    this._classList = [
      this._prefixCls,
      (!this._disabled) && `${this._prefixCls}-enabled`,
      (this._disabled) && `${this._prefixCls}-disabled`,
    ].filter((item) => {
      return !!item;
    });
    this._classList.forEach(_className => {
      this._renderer.addClass(this._el, _className);
    });
  }

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this._disabled) {
      this.searchInputElementRef.nativeElement.focus();
    }
  }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(e: KeyboardEvent): void {
    const keyCode = e.keyCode;
    if (keyCode !== ENTER && keyCode !== TAB) {
      return;
    }
    e.preventDefault();
    if (!this._disabled) {
      this.searchInputElementRef.nativeElement.focus();
    }
  }

  // ngModel Access
  writeValue(value: string[]): void {
    this._updateValue(value, false);
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.Disabled = isDisabled;
  }
  // End ngModel Access

  private _updateValue(value: string[], emitChange: boolean = true): void {
    if (this._value === value) {
      return;
    }
    if (value == null) {
      this._value = [];
    } else {
      this._value = value;
    }
    if (value) {
      if (value.length === 0) {
        this.clearAllSelectedOption(emitChange);
      } else {
        this.updateSelectedOption(value, true);
      }
    } else if (value == null) {
      this.clearAllSelectedOption(emitChange);
    }
  }

  // End COPYCAT

}
