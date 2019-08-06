import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreatorPage } from './recipe-creator.page';

describe('RecipeCreatorPage', () => {
  let component: RecipeCreatorPage;
  let fixture: ComponentFixture<RecipeCreatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCreatorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCreatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
