import { Component } from '@angular/core';

@Component({
  selector: 'simuladorgiros-page',
  templateUrl: 'simuladorgiros.html'
})
export class SimuladorgirosPage {
  selectedOption: string;
  options:Array<Object> = [
      {cost: '$4.700', range: "$0 a $50.000"},
      {cost: '$6.000', range: "$50.001 a $100.000"},
      {cost: '$7.500', range: "$100.001 a $150.000"},
      {cost: '$8.300', range: "$150.001 a $200.000"},
      {cost: '$8.900', range: "$200.001 a $250.000"},
      {cost: '$9.400', range: "$250.001 a $300.000"},
      {cost: '$9.900', range: "$300.001 a $350.000"},
      {cost: '$10.400', range: "$350.001 a $400.000"},
      {cost: '$11.700', range: "$400.001 a $450.000"},
      {cost: '$13.000', range: "$450.001 a $500.000"},
      {cost: '2.7%', range: "$500.001 en adelante"},
  ];
  
}
