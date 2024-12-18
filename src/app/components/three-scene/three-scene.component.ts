import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from "three";
import { animate } from '@angular/animations';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  imports: [],
  templateUrl: './Hospital_Floor.html',
  host: {ngSkipHydration: 'true'},
  styleUrl: './Hospital_Floor.html'
})
export class ThreeSceneComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = 'http://localhost:5500/src/app/components/three-scene/Hospital_Floor.html' as 'http://localhost:4200/three-scene';
    }
  }
}