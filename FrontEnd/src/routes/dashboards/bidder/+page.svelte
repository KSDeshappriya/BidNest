<script>
    export let form;

    $: console.log(form);
</script>

<div class="container">
    <h2>Give Your Support</h2>
    <p>{form?.status}</p>
    <form method="POST">
        <div class="form-group">
            <label for="name">Name:</label>
            <input
                type="text"
                class="form-control"
                name="name"
                id="name"
                placeholder="Enter name"
            />
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input
                type="email"
                class="form-control"
                name="email"
                id="email"
                placeholder="Enter email"
            />
        </div>
        <div class="form-group">
            <label for="message">Message:</label>
            <textarea class="form-control" name="message" id="message" rows="3"
            ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>

<style>
    .container {
        margin-top: 50px;
    }
    form {
        width: 50%;
        margin: 0 auto;
    }
    .form-group {
        margin-bottom: 20px;
    }
    label {
        font-weight: bold;
    }
    .btn {
        margin-top: 20px;
    }
</style>
