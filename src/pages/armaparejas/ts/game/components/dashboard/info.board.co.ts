import { Component, Input } from '@angular/core';

@Component({
    selector: 'info-board',
    template: `
    <h2>{{ title }}</h2>
    <h3 class="text">{{ text }}</h3>
    `,
    styles: [`
    :host {
        width: 120px;
        padding: 10px;
        background-color: #bbada0;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        color: #eae0d1;
    }
    .text {
        color: #fff;
    }

    @media screen and (max-width: 450px) {
        :host {
            width: 105px;
        }
    }
    @media screen and (max-width: 380px) {
        :host {
            width: 95px;
        }
        h2 {
            font-size: 20px;
        }
    }
    @media screen and (max-width: 360px) {
        :host {
            width: 90px;
        }
    }
    `]
})
export class InfoBoardComponent {
    @Input() title: String;
    @Input() text: String;
}
