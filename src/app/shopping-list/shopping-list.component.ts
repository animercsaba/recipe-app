import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';
@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

	shoppingListState: Observable<{ingredients: Ingredient[]}>;

	constructor(private store: Store<fromShoppingList.AppState>) { }

	ngOnInit() {
		// this.ingredients = this.shoppingListService.getIngredients();
		this.shoppingListState = this.store.select('shoppingList');
	}

	onEditItem(index: number) {
		// this.shoppingListService.startedEditing.next(index);
		this.store.dispatch(new ShoppingListActions.StartEdit(index));
	}

}
