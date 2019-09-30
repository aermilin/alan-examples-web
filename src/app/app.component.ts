import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    trigger,
    style,
    animate,
    transition,
} from '@angular/animations';

const animDuration = 300;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('fadeInAndOutAnimation',
            [
                transition(':enter', [
                    style({opacity: '0'}),
                    animate(animDuration, style({opacity: '1'})),
                ]),
                transition(':leave', [
                    style({opacity: '1'}),
                    animate(animDuration, style({opacity: '0'})),
                ]),
            ]),
    ]
})
export class AppComponent implements OnInit {
    isLinear = false;
    drinkFormGroup: FormGroup;
    dessertFormGroup: FormGroup;
    selectedDrink = '';
    selectedDessert = '';
    orderDetails = '';
    isOrderStarted = false;

    @ViewChild('stepper', {static: false}) stepper: any;

    constructor(private _formBuilder: FormBuilder) {

        window.addEventListener('start-order', () => {
            this.startOrder();
        }, false);

        window.addEventListener('select-coffee', (e: any) => {
            this.selectDrink(e.detail.item);
        }, false);

        window.addEventListener('select-dessert', (e: any) => {
            this.selectDessert(e.detail.item);
        }, false);

        window.addEventListener('highlight', (e: any) => {
            this.highlight(e.detail.item);
        }, false);

        window.addEventListener('go-to-next-step', () => {
            this.goToNextStep();
        }, false);

        window.addEventListener('go-to-prev-step', () => {
            this.goToPrevStep();
        }, false);

        window.addEventListener('finish-order', () => {
            this.finishOrder();
        }, false);
    }

    ngOnInit() {
        this.drinkFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.dessertFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }

    public onDessertValChange(val: string) {
        this.selectedDessert = val;
    }

    public onDrinkTypeValChange(val: string) {
        this.selectedDrink = val;
    }

    showResult() {
        this.orderDetails = `Your ordered: ${this.selectedDrink} with ${this.selectedDessert}. Enjoy your meal!`;
    }

    startOrder() {
        this.isOrderStarted = true;
    }

    selectDrink(drink) {
        this.selectedDrink = drink;
    }

    selectDessert(dessert) {
        this.selectedDessert = dessert;
    }

    finishOrder() {
        this.orderDetails = `Enjoy your meal!`;
    }

    highlight(item) {
        const el = document.getElementById(item);

        if (el) {
            el.classList.add('highlighted');
            setTimeout(() => {
                el.classList.remove('highlighted');
            }, 1000);
        }
    }

    goToNextStep() {
        if (this.stepper.selectedIndex < 2) {
            this.stepper.selectedIndex = this.stepper.selectedIndex + 1;
        }
    }

    goToPrevStep() {
        if (this.stepper.selectedIndex > 0) {
            this.stepper.selectedIndex = this.stepper.selectedIndex - 1;
        }
    }
}
