import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnownComponent } from './known.component';

describe('KnownComponent', () => {
  let component: KnownComponent;
  let fixture: ComponentFixture<KnownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
