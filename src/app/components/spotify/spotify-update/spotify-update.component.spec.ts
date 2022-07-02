import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyUpdateComponent } from './spotify-update.component';

describe('SpotifyUpdateComponent', () => {
  let component: SpotifyUpdateComponent;
  let fixture: ComponentFixture<SpotifyUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
