import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';
@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

	@ViewChild('f') slForm: NgForm;
	subscription: Subscription;
	editMode = false;
	// editedItemIndex: number;
	editedItem: Ingredient;

	constructor(private store: Store<fromShoppingList.AppState>) { }

	ngOnInit() {
		// this.subscription = this.shoppingListService.startedEditing.subscribe(
		// 	(index: number) => {
		// 		this.editedItemIndex = index;
		// 		this.editMode = true;
		// 		this.editedItem = this.shoppingListService.getIngredient(index);
		// 		this.slForm.setValue({
		// 			name: this.editedItem.name,
		// 			amount: this.editedItem.amount
		// 		});
		// 	}
		// );
		this.subscription = this.store.select('shoppingList').subscribe(
			data => {
				if (data.editedIngredientIndex > -1) {
					this.editedItem = data.editedIngredient;
					this.editMode = true;
					this.slForm.setValue({
						name: this.editedItem.name,
						amount: this.editedItem.amount
					});
				} else {
					this.editMode = false;
				}
			}
		);
	}

	onSubmit(form: NgForm) {
		const value = form.value;
		const newIng = new Ingredient(value.name, value.amount);
		if (this.editMode) {
			// this.shoppingListService.updateIngredient(this.editedItemIndex, newIng);
			this.store.dispatch(new ShoppingListActions.UpdateIngredient({
				ingredient: newIng
			}));
		} else {
			// this.shoppingListService.addIngredients(newIng);
			this.store.dispatch(new ShoppingListActions.AddIngredient(newIng));
		}
		this.onClear();
	}

	onClear() {
		this.slForm.reset();
		this.editMode = false;
	}

	onDelete() {
		// this.shoppingListService.deleteIngredient(this.editedItemIndex)
		this.store.dispatch(new ShoppingListActions.DeleteIngredient());
		this.onClear();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
		this.store.dispatch(new ShoppingListActions.StopEdit());
	}

}
