import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {


  @Input() counter
  @Input() total
  @Input() show_stats


  constructor() { }

  ngOnInit(): void {
  }


  reload(){
    location.reload();
  }

  close_window(){
    this.show_stats = false
  }
}
