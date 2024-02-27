$(document).ready(function () {
  $("form").submit(function (event) {
    // Prevent default form submission behavior
    event.preventDefault();
    
    // Remove existing error classes and messages
    $(".form-group").removeClass("has-error");
    
    var formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      superheroAlias: $("#superheroAlias").val(),
    };

    $.ajax({
      type: "POST",
      url: "process.php",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
      if (!data.success) {
        // Append error messages
        if (data.errors.name) {
          $("#name-group").addClass("has-error").append('<div class="help-block">' + data.errors.name + "</div>");
        }

        if (data.errors.email) {
          $("#email-group").addClass("has-error").append('<div class="help-block">' + data.errors.email + "</div>");
        }

        if (data.errors.superheroAlias) {
          $("#superhero-group").addClass("has-error").append('<div class="help-block">' + data.errors.superheroAlias + "</div>");
        }
      } else {
        // Display success message
        $("form").html('<div class="alert alert-success">' + data.message + "</div>");
      }
    }).fail(function (data) {
      // Display error message for server failure
      $("form").html('<div class="alert alert-danger">Could not reach server, please try again later.</div>');
    });
  });
});
