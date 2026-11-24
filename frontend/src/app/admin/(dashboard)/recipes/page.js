"use client";

import ResourceManager from "@/components/admin/ResourceManager";
import RecipeForm from "@/components/admin/recipes/RecipeForm";
import { fetchRecipes, createRecipe, updateRecipe, deleteRecipe } from "@/lib/api/recipes";

const columns = [
  { key: "title", header: "Title", render: (row) => <span className="font-medium">{row.title}</span> },
  { key: "preparationTime", header: "Prep Time" },
  { key: "cookingTime", header: "Cook Time" },
  { key: "ingredients", header: "Ingredients", render: (row) => `${row.ingredients?.length ?? 0} items` },
];

async function fetchAllRecipes() {
  const { items } = await fetchRecipes({ limit: 100 });
  return items;
}

export default function AdminRecipesPage() {
  return (
    <ResourceManager
      resourceLabel="Recipe"
      columns={columns}
      searchKeys={["title"]}
      fetchAll={fetchAllRecipes}
      FormComponent={RecipeForm}
      modalSize="lg"
      getFormInitialValues={(item) => ({
        title: item?.title ?? "",
        description: item?.description ?? "",
        preparationTime: item?.preparationTime ?? "",
        cookingTime: item?.cookingTime ?? "",
        ingredients: item?.ingredients?.length ? item.ingredients : [""],
        instructions: item?.instructions?.length ? item.instructions : [""],
        image: item?.image ?? null,
      })}
      onCreate={(formData) => createRecipe(formData)}
      onUpdate={(id, formData) => updateRecipe(id, formData)}
      onDelete={(id) => deleteRecipe(id)}
    />
  );
}
