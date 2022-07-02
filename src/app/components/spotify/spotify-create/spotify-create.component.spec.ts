import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyCreateComponent } from './spotify-create.component';

describe('SpotifyCreateComponent', () => {
  let component: SpotifyCreateComponent;
  let fixture: ComponentFixture<SpotifyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
