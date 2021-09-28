import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Renderer2
} from '@angular/core';
import {Subject} from "rxjs";
import {DeviceDetectorService} from "ngx-device-detector";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-input-text2',
  templateUrl: './input-text2.component.html',
  styleUrls: ['./input-text2.component.scss']
})
export class InputText2Component implements OnInit, AfterViewInit {
  @Input() disabled = false;
  @Input() icon = ''
  @Input() iconPosition : 'left' | 'right' = 'right';
  @Input() pdaAutoEnter = false;
  @Input() placeHolder = '';
  @Input() showIcon = false;
  @Input() title = 'Insert Title';
  @Input() type : 'email' | 'number' | 'text' = 'text';
  @Output() enterEmitted = new EventEmitter()
  @Output() iconClick = new EventEmitter();
  @ViewChild('inputScan') inputScan: ElementRef| undefined;
  @ViewChild('iconDiv') iconDiv: ElementRef| undefined;

  inputValue = '';
  public lpnUpdate = new Subject<string>();

  constructor(private render: Renderer2) {
    if (this.pdaAutoEnter) {
      this.lpnUpdate
        .pipe(
          debounceTime(100),
          distinctUntilChanged()
        )
        .subscribe(async value => {
          if (value) {
            this.enterEmit();
          } else {
            return;
          }
        });
    }
  }

  ngAfterViewInit() {
    if (this.iconPosition === "left" && this.showIcon) {
      this.render.addClass(this.inputScan?.nativeElement, 'iconLeft')
      this.render.addClass(this.iconDiv?.nativeElement, 'iconLeft')
    }
  }

  ngOnInit(): void {
  }

  click() {
    this.iconClick.emit('iconClick')
  }

  enterEmit() {
    if (this.inputValue){
      this.enterEmitted.emit(this.inputValue);
    }
  }

}
