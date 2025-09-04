"use client";

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  unit?: string;
  groupLabel?: string;
}

interface IngredientGroupProps {
  ingredients: Ingredient[];
}

export function IngredientGroup({ ingredients }: IngredientGroupProps) {
  // Group ingredients by groupLabel
  const groupedIngredients = ingredients.reduce((acc, ingredient) => {
    const group = ingredient.groupLabel || "Ingredients";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(ingredient);
    return acc;
  }, {} as Record<string, Ingredient[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedIngredients).map(([groupLabel, groupIngredients]) => (
        <div key={groupLabel}>
          <h3 className="mb-3 font-semibold text-lg border-b border-primary/20 pb-2">{groupLabel}</h3>
          <ul className="space-y-3">
            {groupIngredients.map((ingredient) => (
              <li key={ingredient.id} className="flex items-start">
                <div className="mr-3 mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>
                <div className="flex-1">
                  <span className="font-medium">{ingredient.quantity} {ingredient.unit}</span>
                  <span className="ml-1">{ingredient.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}