import React, { useState, useContext, useEffect } from "react";
import { RecipeContext } from "../state/RecipeContext";

const RecipeForm = () => {
	const { selectedRecipe, postRecipe, editRecipe } = useContext(RecipeContext);

	const [name, setName] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const [instructions, setInstructions] = useState([]);
	const [time, setTime] = useState("");

	// update state if there is a selected recipe
	useEffect(() => {
		if (selectedRecipe) {
			setName(selectedRecipe.name);
			setIngredients(selectedRecipe.ingredients);
			setInstructions(selectedRecipe.instructions);
			setTime(selectedRecipe.time);
		} else {
			setName("");
			setIngredients([]);
			setInstructions([]);
			setTime("");
		}
	}, [selectedRecipe]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const newRecipe = {
			name,
			ingredients,
			instructions,
			time,
		};
		if (selectedRecipe) {
			editRecipe(selectedRecipe._id, newRecipe);
		} else {
			postRecipe(newRecipe);
		}
		setName("");
		setIngredients([]);
		setInstructions([]);
		setTime("");
	};

	const handleIngredientChange = (event, index) => {
		const newIngredients = [...ingredients];
		newIngredients[index] = event.target.value;
		setIngredients(newIngredients);
	};

	const handleAddIngredient = () => {
		setIngredients([...ingredients, ""]);
	};

	const handleInstructionChange = (event, index) => {
		const newInstructions = [...instructions];
		newInstructions[index] = event.target.value;
		setInstructions(newInstructions);
	};

	const handleAddInstruction = () => {
		setInstructions([...instructions, ""]);
	};

	return (
		<div>
			<h2>{selectedRecipe ? "Edit" : "Add"} Recipe</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="ingredients">Ingredients:</label>
					{ingredients.map((ingredient, index) => (
						<input
							key={index}
							type="text"
							name={`ingredient-${index}`}
							value={ingredient}
							onChange={(event) => handleIngredientChange(event, index)}
						/>
					))}
					<button type="button" onClick={handleAddIngredient}>
						Add Ingredient
					</button>
				</div>
				<div>
					<label htmlFor="instructions">Instructions:</label>
					{instructions.map((instruction, index) => (
						<input
							key={index}
							type="text"
							name={`instruction-${index}`}
							value={instruction}
							onChange={(event) => handleInstructionChange(event, index)}
						/>
					))}
					<button type="button" onClick={handleAddInstruction}>
						Add Instruction
					</button>
				</div>
				<div>
					<label htmlFor="time">Time (minutes):</label>
					<input
						type="number"
						name="time"
						value={time}
						onChange={(event) => setTime(event.target.value)}
					/>
				</div>
				<button type="submit">{selectedRecipe ? "Save" : "Submit"}</button>
			</form>
		</div>
	);
};

export default RecipeForm;