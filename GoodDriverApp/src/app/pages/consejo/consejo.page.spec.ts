import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejoPage } from './consejo.page';

describe('ConsejoPage', () => {
  let component: ConsejoPage;
  let fixture: ComponentFixture<ConsejoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsejoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
