<script lang="ts">
    import { onMount } from 'svelte';

    // Page data (don't use export for local variables)
    export let data;

    // Reactive variable for items
    $: items = data.items;
    $: userProfile = data.user;

    // export let form;
    // $: console.log(form);

    console.log(data);

    let currentSection = 'dashboard';
    let addItemModalVisible = false;
    let editItemModalVisible = false;
    let itemToEdit = null;

    // Reactive variables for modal form inputs
    let itemTitle = '';
    let itemDescription = '';
    let itemStartingPrice = '';
    let itemEndTime = '';
    let itemImagePath = '';

    let editItemTitle = '';
    let editItemDescription = '';
    let editItemStartingPrice = '';
    let editItemEndTime = '';
    let editItemImagePath = '';

    function showSection(sectionName: string) {
        currentSection = sectionName;
    }

    function editItem(item) {
        itemToEdit = { ...item };
        editItemTitle = item.title;
        editItemDescription = item.description;
        editItemStartingPrice = item.startingPrice.toString();
        editItemEndTime = item.endTime;
        editItemImagePath = item.imagePath;
        editItemModalVisible = true;
    }

    function deleteItem(itemId: number) {
        if (confirm("Are you sure you want to delete this auction?")) {
            items = items.filter(item => item.id !== itemId);
        }
    }

    function addItem(newItem) {
        items.push(newItem);
        addItemModalVisible = false;
    }

    function updateItem(updatedItem) {
        const index = items.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            items[index] = updatedItem;
        }
        editItemModalVisible = false;
    }

    let editProfileModalVisible = false;

    function updateProfile() {
        // Call API to update user profile
        console.log('Profile updated:', userProfile);
        editProfileModalVisible = false;
    }

    onMount(() => {
        showSection('dashboard');
    });
</script>



<div class="sellerDash">
    <div class="sidebar">
        <h2>BidNest</h2>
        <ul>
            <li><a on:click={() => showSection('dashboard')}>Dashboard</a></li>
            <li><a on:click={() => showSection('myItems')}>My Auctions</a></li>
            <li><a on:click={() => showSection('soldItems')}>Sold Items</a></li>
            <li><a on:click={() => showSection('analytics')}>Analytics</a></li>
            <li><a on:click={() => showSection('userProfile')}>User Profile</a></li>
        </ul>
    </div>

    <div class="main-content">
        <div class="header">
            <h1>Seller Dashboard</h1>
            <button class="primary-btn" on:click={() => addItemModalVisible = true}><i class="fas fa-plus"></i> Add New Auction</button>
        </div>
        {#if currentSection === 'dashboard'}
            <div id="dashboardSection" class="dashboard-section">
                <h3>Recent Auctions</h3>
                <div id="recentActivityList" class="item-list">
                    <!-- {#each items.slice(0, 5) as item} -->
                    {#each items as item}
                        <div class="item">
                            <img src="http://localhost:5170{item.imagePath}" alt={item.title}>
                            <h4>{item.title}</h4>
                            <p>Current Price: ${item.currentPrice || item.startingPrice}</p>
                            <p>End Time: {new Date(item.endTime).toLocaleString()}</p>
                            <span class="live-indicator {item.isAuctionLive ? 'active' : 'inactive'}">
                                {item.isAuctionLive ? 'Live' : 'Ended'}
                            </span>
                        </div>
                    {/each}
                </div>
            </div>
        {:else if currentSection === 'myItems'}
            <div id="myItemsSection" class="dashboard-section">
                <h3>My Auctions</h3>
                <div id="myItemsList" class="item-list">
                    {#each items.filter(item => item.isAuctionLive) as item}
                        <div class="item">
                            <img src="http://localhost:5170{item.imagePath}" alt={item.title}>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                            <p>Starting Price: ${item.startingPrice}</p>
                            <p>Current Price: ${item.currentPrice || item.startingPrice}</p>
                            <p>End Time: {new Date(item.endTime).toLocaleString()}</p>
                            <span class="live-indicator active">Live</span>
                            <div class="item-actions">
                                <button class="secondary-btn" on:click={() => editItem(item)}>Edit</button>
                                <button class="primary-btn" on:click={() => deleteItem(item.id)}>Delete</button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {:else if currentSection === 'soldItems'}
            <div id="soldItemsSection" class="dashboard-section">
                <h3>Sold Items</h3>
                <div id="soldItemsList" class="item-list">
                    {#each items.filter(item => !item.isAuctionLive) as item}
                        <div class="item">
                            <img src="http://localhost:5170{item.imagePath}" alt={item.title}>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                            <p>Starting Price: ${item.startingPrice}</p>
                            <p>Sold Price: ${item.currentPrice || item.startingPrice}</p>
                            <p>End Time: {new Date(item.endTime).toLocaleString()}</p>
                            <span class="live-indicator inactive">Ended</span>
                        </div>
                    {/each}
                </div>
            </div>
        {:else if currentSection === 'analytics'}
            <div id="analyticsSection" class="dashboard-section">
                <h3>Analytics</h3>
                <div class="analytics-card">
                    <h4>Total Revenue</h4>
                    <div class="analytics-value">${items.reduce((sum, item) => sum + (item.isAuctionLive ? 0 : item.currentPrice), 0)}</div>
                </div>
                <div class="analytics-card">
                    <h4>Active Auctions</h4>
                    <div class="analytics-value">{items.filter(item => item.isAuctionLive).length}</div>
                </div>
                <div class="analytics-card">
                    <h4>Items Sold</h4>
                    <div class="analytics-value">{items.filter(item => !item.isAuctionLive).length}</div>
                </div>
                <div class="analytics-card">
                    <h4>Average Sale Price</h4>
                    <div class="analytics-value">${items.filter(item => !item.isAuctionLive).length > 0 ? (items.reduce((sum, item) => sum + (item.isAuctionLive ? 0 : item.currentPrice), 0) / items.filter(item => !item.isAuctionLive).length).toFixed(2) : 0}</div>
                </div>
            </div>
        {:else if currentSection === 'userProfile'}
            <div id="userProfileSection" class="dashboard-section container mt-5">
                <h2 class="text-center mb-4">User Profile</h2>
                <div class="card profile-card">
                    <div class="profile-header">
                        <h3>{userProfile.firstName} {userProfile.lastName}</h3>
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        <img src={userProfile.profilePicturePath} alt="Profile Picture" class="img-fluid profile-picture" />
                    </div>
                    <div class="card-body profile-info">
                        <p><i class="fas fa-user icon"></i><strong>Username:</strong> {userProfile.userName}</p>
                        <p><i class="fas fa-envelope icon"></i><strong>Email:</strong> {userProfile.email}</p>
                        <p><i class="fas fa-phone icon"></i><strong>Phone:</strong> {userProfile.phoneNumber}</p>
                        <p><i class="fas fa-map-marker-alt icon"></i><strong>Address:</strong> {userProfile.address}</p>
                        <p><i class="fas fa-calendar-alt icon"></i><strong>Date of Birth:</strong> {new Date(userProfile.dateOfBirth).toLocaleDateString()}</p>
                        <button class="btn btn-edit mt-3" on:click={() => editProfileModalVisible = true}>Edit Profile</button>
                    </div>
                </div>

                <!-- Edit Profile Modal -->
                {#if editProfileModalVisible}
                    <div class="modal">
                        <div class="modal-content">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <span class="close" on:click={() => editProfileModalVisible = false}>×</span>
                            <h2>Edit Profile</h2>
                            <form on:submit|preventDefault={updateProfile}>
                                <div class="form-group">
                                    <label for="firstName">User Name:</label>
                                    <input type="text" bind:value={userProfile.userName} required />
                                </div>
                                <div class="form-group">
                                    <label for="email">Email:</label>
                                    <input type="email" bind:value={userProfile.email} required />
                                </div>
                                <div class="form-group">
                                    <label for="phoneNumber">Phone Number:</label>
                                    <input type="text" bind:value={userProfile.phoneNumber} required />
                                </div>
                                <div class="form-group">
                                    <label for="address">Address:</label>
                                    <input type="text" bind:value={userProfile.address} required />
                                </div>
                                <div class="form-group">
                                    <label for="dateOfBirth">Date of Birth:</label>
                                    <input type="datetime-local" bind:value={userProfile.dateOfBirth} required />
                                </div>
                                <div class="form-group">
                                    <label for="profilePicture">
                                        <label for="profilePicture">Profile Picture:</label>
                                    <input type="file" id="profilePicture" accept="image/*" on:change={event => {
                                        const file = event.target.files[0];
                                        if (file) {
                                            // Here you would typically upload the file and get the path
                                            // For demonstration, we will just set a placeholder path
                                            userProfile.profilePicturePath = URL.createObjectURL(file);
                                        }
                                    }} />
                                </div>
                                <button type="submit" class="primary-btn">Update Profile</button>
                            </form>
                        </div>
                    </div>
                {/if}
            </div>
        {/if}

        <!-- Add Item Modal -->
        {#if addItemModalVisible}
            <div class="modal">
                <div class="modal-content">
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span class="close" on:click={() => addItemModalVisible = false}>×</span>
                    <h2>Add New Auction</h2>
                    <form method="POST" action="?/createItem" enctype="multipart/form-data">
                        <!-- 
                        on:submit|preventDefault={() => {
                        const newItem = {
                            id: items.length + 1,
                            title: itemTitle,
                            description: itemDescription,
                            startingPrice: parseFloat(itemStartingPrice),
                            currentPrice: parseFloat(itemStartingPrice),
                            startTime: new Date().toISOString(),
                            endTime: itemEndTime,
                            imagePath: itemImagePath,
                            isAuctionLive: true,
                            // imagePath: "/images/placeholder.jpg", // Placeholder image
                        };
                        addItem(newItem);
                    }}
                        -->
                        <div class="form-group">
                            <label for="itemTitle">Title:</label>
                            <input type="text"  name="title" bind:value={itemTitle} required />
                        </div>
                        <div class="form-group">
                            <label for="itemDescription">Description:</label>
                            <textarea name="description" bind:value={itemDescription} required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="itemStartingPrice">Starting Price:</label>
                            <input type="number" name="startingPrice" bind:value={itemStartingPrice} required />
                        </div>
                        <div class="form-group">
                            <label for="itemStartTime">Start Time:</label>
                            <input type="datetime-local" name="startTime" required />
                        </div>
                        <div class="form-group">
                            <label for="itemEndTime">End Time:</label>
                            <input type="datetime-local" name="endTime" bind:value={itemEndTime} required />
                        </div>
                        <div class="form-group">
                            <label for="itemImage">Image:</label>
                            <input type="file" id="itemImage" name="imageFile" accept="image/*" bind:value={itemImagePath} required>
                        </div>
                        <button type="submit" class="primary-btn">Add Auction</button>
                    </form>
                </div>
            </div>
        {/if}

        <!-- Edit Item Modal -->
        {#if editItemModalVisible}
            <div class="modal">
                <div class="modal-content">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <span class="close" on:click={() => editItemModalVisible = false}>×</span>
                    <h2>Edit Auction</h2>
                    <form on:submit|preventDefault={() => {
                        updateItem({
                            id: itemToEdit ? itemToEdit.id : 0,
                            title: editItemTitle,
                            description: editItemDescription,
                            startingPrice: parseFloat(editItemStartingPrice),
                            currentPrice: itemToEdit ? itemToEdit.currentPrice : 0,
                            startTime: itemToEdit?.startTime || '',
                            endTime: editItemEndTime,
                            isAuctionLive: itemToEdit?.isAuctionLive || false,
                            imagePath: itemToEdit?.imagePath || '',
                        });
                    }}>
                        {#if itemToEdit}
                            <input type="hidden" bind:value={itemToEdit.id} />
                        {/if}
                        <div class="form-group">
                            <label for="editItemTitle">Title:</label>
                            <input type="text" name="title" bind:value={editItemTitle} required />
                        </div>
                        <div class="form-group">
                            <label for="editItemDescription">Description:</label>
                            <textarea name="description" bind:value={editItemDescription} required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="editItemStartingPrice">Starting Price:</label>
                            <input type="number" name="startingPrice" bind:value={editItemStartingPrice} required />
                        </div>
                        <div class="form-group">
                            <label for="editItemEndTime">End Time:</label>
                            <input type="datetime-local" name="endTime" bind:value={editItemEndTime} required />
                        </div>
                        <div class="form-group">
                            <label for="editItemImage">Image:</label>
                            <input type="file" id="editItemImage" accept="image/*" name="imagePath" bind:value={editItemImagePath} required>
                        </div>
                        <button type="submit" class="primary-btn">Update Auction</button>
                    </form>
                </div>
            </div>
        {/if}
    </div>

</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

    /* General Styles */
    :root {
        --primary-color: #3498db;
        --secondary-color: #2ecc71;
        --background-color: #f4f6f9;
        --text-color: #34495e;
        --sidebar-color: #2c3e50;
        --card-color: #ffffff;
    }

    .sellerDash {
        font-family: 'Roboto', sans-serif;
        background-color: var(--background-color);
        color: var(--text-color);
        min-height: 100vh;
    }

    /* Sidebar Styles */
    .sidebar {
        width: 250px;
        background-color: #2c3e50;
        color: white;
        position: fixed;
        height: 100%;
        padding: 20px;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .sidebar h2 {
        text-align: center;
        margin-bottom: 20px;
    }

    .sidebar ul {
        list-style: none;
        padding: 0;
    }

    .sidebar li {
        margin: 15px 0;
    }

    .sidebar a {
        color: white;
        text-decoration: none;
        padding: 10px;
        display: block;
        border-radius: 5px;
        transition: background 0.3s;
    }

    .sidebar a:hover {
        background-color: #34495e;
    }

    /* Main Content Styles */
    .main-content {
        margin-left: 270px;
        padding: 20px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .header h1 {
        margin: 0;
    }

    .primary-btn {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }

    .primary-btn:hover {
        background-color: #2980b9;
    }

    .secondary-btn {
        background-color: var(--secondary-color);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }

    .secondary-btn:hover {
        background-color: #27ae60;
    }

    /* Dashboard Section Styles */
    .dashboard-section {
        background: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }

    .item-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    .item {
        background-color: #f8f9fa;
        border-radius: 5px;
        padding: 15px;
        transition: all 0.3s ease;
    }

    .item:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }

    .item h4 {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: bold;
    }

    .item p {
        margin-bottom: 5px;
        font-size: 14px;
    }

    .item img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .item-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }

    .item-actions button {
        padding: 5px 10px;
        margin-left: 10px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 12px;
    }

    .live-indicator {
        padding: 5px 10px;
        border-radius: 3px;
        font-weight: bold;
    }

    .live-indicator.active {
        background-color: #2ecc71;
        color: white;
    }

    .live-indicator.inactive {
        background-color: #e74c3c;
        color: white;
    }

    /* Modal Styles */
    .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
        animation: fadeIn 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background: white;
        position: relative;margin: 5% auto;
        padding: 30px;
        border-radius: 10px;
        width: 80%;
        max-width: 600px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        animation: slideDown 0.3s ease;
    }

    .close {
        position: absolute;
        top: 10px;
        right: 15px;
        cursor: pointer;
        font-size: 20px;
        color: #e74c3c;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
    }
    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #bdc3c7;
        border-radius: 5px;
        box-sizing: border-box;
        transition: border-color 0.3s;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        border-color: #3498db;
        outline: none;
    }

    .analytics-card {
        background: #ecf0f1;
        border-radius: 5px;
        padding: 15px;
        margin: 10px 0;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    }

    .analytics-card h4 {
        margin: 0;
        font-size: 1.2em;
    }

    .analytics-value {
        font-size: 1.5em;
        font-weight: bold;
        color: #2c3e50;
    }

    /* user profile */
    .profile-card {
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            position: relative;
        }
        .profile-header {
            background-image: url('https://source.unsplash.com/1600x400/?nature,water'); /* Background image */
            background-size: cover;
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .profile-picture {
            width: 150px;
            height: 150px;
            border: 5px solid white;
            border-radius: 50%;
            position: absolute;
            top: 100px; /* Adjust to overlap the header */
            left: 50%;
            transform: translateX(-50%);
        }
        .profile-info {
            padding: 80px 20px 20px; /* Add padding to avoid overlap */
        }
        .profile-info p {
            margin: 0;
        }
        .profile-info .icon {
            margin-right: 10px;
            color: #007bff;
        }
        .btn-edit {
            background-color: #007bff;
            color: white;
            border-radius: 20px;
            padding: 10px 20px;
            transition: background-color 0.3s;
        }
        .btn-edit:hover {
            background-color: #0056b3;
        }


    /* Responsive Styles */
    @media (max-width: 768px) {
        .sidebar {
            width: 100%;
            position: relative;
            height: auto;
        }

        .main-content {
            margin-left: 0;
        }

        .item {
            width: calc(50% - 20px);
        }
    }

    @media (max-width: 480px) {
        .item {
            width: 100%;
        }

        .modal-content {
            width: 90%;
        }
    }

    .profile-card {
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        position: relative;
        margin-bottom: 30px;
    }
    .profile-header {
        background-image: url('https://source.unsplash.com/1600x400/?nature,water');
        background-size: cover;
        color: white;
        padding: 40px 20px;
        text-align: center;
    }
    .profile-picture {
        width: 150px;
        height: 150px;
        border: 5px solid white;
        border-radius: 50%;
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
    }
    .profile-info {
        padding: 80px 20px 20px;
    }
    .profile-info p {
        margin: 0;
    }
    .profile-info .icon {
        margin-right: 10px;
        color: #007bff;
    }
    .btn-edit {
        background-color: #007bff;
        color: white;
        border-radius: 20px;
        padding: 10px 20px;
        transition: background-color 0.3s;
    }
    .btn-edit:hover {
        background-color: #0056b3;
    }
</style>