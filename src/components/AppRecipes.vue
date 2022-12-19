<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="title">
          <center style="background-color:#5DC1B9;"><h1>APP RECIPE</h1></center>
          <hr />
          <br />
          <!-- Allert Message -->
          <b-alert v-if="showMessage" variant="success" show>{{
            message
          }}</b-alert>
          <!-- b-alert v-if="error" variant="danger" show>{{ error }}</b-alert-->

          <button
            type="button"
            class="btn btn-success btn-sm"
            v-b-modal.recipe-modal
          >
            Create Recipe
          </button>
          <br /><br />
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Ingredients</th>
                <th scope="col">Steps</th>
                <th scope="col">Rating (1-5)</th>
                <th scope="col">Favorite</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="recipe in recipes" :key="recipe.id">
                <td>{{ recipe.name }}</td>
                <td>{{ recipe.ingredients }}</td>
                <td>{{ recipe.steps }}</td>
                <td>{{ recipe.rating }}</td>
                <td>
                  <input type="checkbox" class="checkbox" v-model="recipe.favorite" />
                </td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.edit-recipe-modal
                      @click="editRecipe(recipe)"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="deleteRecipe(recipe)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <footer class="text-center" style="background-color:#5DC1B9;">
            
            Add New Recipes for the Comunity to Use :)
          </footer>
        </div>
      </div>
      <b-modal
        ref="addRecipeModal"
        id="recipe-modal"
        title="Add a recipe"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmit" class="w-100">
          <b-form-group
            id="form-name-group"
            label="Name:"
            label-for="form-name-input"
          >
            <b-form-input
              id="form-name-input"
              type="text"
              v-model="createRecipeForm.name"
              placeholder="Name"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-ingredients-group"
            label="Ingredients:"
            label-for="form-ingredients-input"
          >
            <b-form-input
              id="form-ingredients-input"
              type="text"
              v-model="createRecipeForm.ingredients"
              placeholder="Ingredients"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-steps-group"
            label="Steps:"
            label-for="form-steps-input"
          >
            <b-form-input
              id="form-steps-input"
              type="text"
              v-model="createRecipeForm.steps"
              placeholder="Steps"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-rating-group"
            label="Rating (1-5):"
            label-for="form-rating-input"
          >
            <b-form-input
              id="form-rating-input"
              min = 1
              max = 5
              type="number"
              v-model.number="createRecipeForm.rating"
              placeholder="Rating"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-favorite-group"
            label="Favorite:"
            label-for="form-favorite-input"
          >
            <b-form-checkbox
              id="form-favorite-input"
              type="checkbox"
              v-model="createRecipeForm.favorite"
              required
            >
            </b-form-checkbox>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Create Recipe-->
      <!-- Start of Modal for Edit Recipe-->
      <b-modal
        ref="editRecipeModal"
        id="edit-recipe-modal"
        title="Edit the recipe"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitUpdate" class="w-100">
          <b-form-group
            id="form-edit-name-group"
            label="Name:"
            label-for="form-edit-name-input"
          >
            <b-form-input
              id="form-edit-name-input"
              type="text"
              v-model="editRecipeForm.name"
              placeholder="Name"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-edit-ingredients-group"
            label="Ingredients:"
            label-for="form-edit-ingredients-input"
          >
            <b-form-input
              id="form-edit-ingredients-input"
              type="text"
              v-model="editRecipeForm.ingredients"
              placeholder="Ingredients"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-edit-steps-group"
            label="Steps:"
            label-for="form-edit-steps-input"
          >
            <b-form-input
              id="form-edit-steps-input"
              type="text"
              v-model="editRecipeForm.steps"
              placeholder="Steps"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-edit-rating-group"
            label="Rating (1-5):"
            label-for="form-edit-rating-input"
          >
            <b-form-input
              id="form-edit-rating-input"
              min = 1
              max = 5
              type="number"
              v-model.number="editRecipeForm.rating"
              placeholder="Rating"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-edit-favorite-group"
            label="Favorite:"
            label-for="form-edit-favorite-input"
          >
            <b-form-checkbox
              id="form-edit-favorite-input"
              type="checkbox"
              v-model="editRecipeForm.favorite"
              required
            >
            </b-form-checkbox>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Update</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Edit Account-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AppRecipes",
  data() {
    return {
      recipes: [],
      createRecipeForm: {
        name: "",
        ingredients: "",
        steps: "",
        rating: 1,
        favorite: false,
      },
      editRecipeForm: {
        id: "",
        name: "",
        ingredients: "",
        steps: "",
        rating: 1,
        favorite: false,
      },
      showMessage: false,
      message: "",
    };
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/
    //GET function
    RESTgetRecipes() {
      const path = `${process.env.VUE_APP_ROOT_URL}/`;
      axios
        .get(path)
        .then((response) => {
          this.recipes = response.data.recipes;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // POST function
    RESTcreateRecipe(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/`;
      axios
        .post(path, payload)
        .then((response) => {
          this.RESTgetRecipes();
          // For message alert
          this.message = "Recipe Created succesfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetRecipes();
        });
    },
    // Update function
    RESTupdateRecipe(payload, recipeId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/${recipeId}`;
      axios
        .put(path, payload)
        .then((response) => {
          this.RESTgetRecipes();
          // For message alert
          this.message = "Recipe Updated succesfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        });
    },
    // Delete account
    RESTdeleteRecipe(recipeId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/${recipeId}`;
      axios
        .delete(path)
        .then((response) => {
          this.RESTgetRecipes();
          // For message alert
          this.message = "Recipe Deleted succesfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetRecipes();
        });
    },
    /***************************************************
     * FORM MANAGEMENT
     * *************************************************/
    // Initialize forms empty
    initForm() {
      this.createRecipeForm.name = "";
      this.createRecipeForm.ingredients = "";
      this.createRecipeForm.steps = "";
      this.createRecipeForm.rating = 1;
      this.createRecipeForm.favorite = false;
      this.editRecipeForm.name = "";
      this.editRecipeForm.ingredients = "";
      this.editRecipeForm.steps = "";
      this.editRecipeForm.rating = 1;
      this.editRecipeForm.favorite = false;
    },
    // Handle submit event for create recipe
    onSubmit(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.addRecipeModal.hide(); //hide the modal when submitted
      const payload = {
        name: this.createRecipeForm.name,
        ingredients: this.createRecipeForm.ingredients,
        steps: this.createRecipeForm.steps,
        rating: this.createRecipeForm.rating,
        favorite: this.createRecipeForm.favorite,
      };
      this.RESTcreateRecipe(payload);
      this.initForm();
    },
    // Handle submit event for edit recipe
    onSubmitUpdate(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.editRecipeModal.hide(); //hide the modal when submitted
      const payload = {
        name: this.editRecipeForm.name,
        ingredients: this.editRecipeForm.ingredients,
        steps: this.editRecipeForm.steps,
        rating: this.editRecipeForm.rating,
        favorite: this.editRecipeForm.favorite,
      };
      this.RESTupdateRecipe(payload, this.editRecipeForm.id);
      this.initForm();
    },
    // Handle edit button
    editRecipe(recipe) {
      this.editRecipeForm = recipe;
    },
    // Handle Delete button
    deleteRecipe(recipe) {
      this.RESTdeleteRecipe(recipe.id);
    },
  },
  /***************************************************
   * LIFECYClE HOOKS
   ***************************************************/
  created() {
    this.RESTgetRecipes();
  },
};
</script>