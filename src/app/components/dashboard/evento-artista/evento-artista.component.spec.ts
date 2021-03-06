import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoArtistaComponent } from './evento-artista.component';

describe('EventoArtistaComponent', () => {
  let component: EventoArtistaComponent;
  let fixture: ComponentFixture<EventoArtistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoArtistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
