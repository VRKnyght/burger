
$(() => {
	$(".change-cooked").on("click", (event) => {
		const id = $(this).data("id");
		const newCook = $(this).data("newcook");

		const newCookState = {
			cooked: newCook
		};

		$.ajax("/api/burgers/" + id, {
			type: "PUT",
			data: newCookState
		}).then( () => {
			console.log("changed cooked to: " + newCook);

			location.reload();
		});
	});

	$(".create-form").on("submit", (event) => {
		event.preventDefault();

		const newBurger = {
			name: $("#bur").val().trim(),
			cooked: $("[name=cooked]").val().trim(),
			devoured: $("[name=devoured]").val().trim()
		};

		$.ajax("/api/burgers", {
			type: "POST",
			data: newBurger
		}).then( () => {
			console.log("created new burger")

			location.reload();
		});
	});

	$(".delete-burger").on("click", (event) => {
		const id = $(this).data("id");

		$.ajax("/api/burgers/" + id, {
			type: "DELETE",
		}).then( () => {
			console.log("deleted burger", id)

			location.reload();
		})
	})
});