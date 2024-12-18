import { TestBed } from '@angular/core/testing';
import { ThreeSceneComponent } from './three-scene.component';

describe('ThreeSceneComponent', () => {
  let component: ThreeSceneComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeSceneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
