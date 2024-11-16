import { Component, Input  } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [NgIf],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  @Input() counter:any
  @Input() total:any
  @Input() show_stats:any


  reload(){
    location.reload();
  }

  close_window(){
    this.show_stats = false
  }


}
