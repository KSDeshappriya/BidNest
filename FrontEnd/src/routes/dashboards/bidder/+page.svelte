<!-- 
    - This is the page that will be displayed when the bidder logs in
    - It will display currently bid items, items that the bidder has won, and items that the bidder has lost
    - The bidder can also remove their bid from an item
    - It will also display the bidder's profile information
    - The bidder can also update their profile information  
-->
<script lang="ts">
    import { onMount } from 'svelte';

    // userId & items data from the server
    export let data;
    let profile = data.profile;
    let items2 = data.items.map((i: any) => ({
        id: i.itemId,
        bidderId: i.bidderId, // Assuming you're getting the bidderId from somewhere else
        title: i.itemName,
        description: i.itemDescription || "No Description",
        startingPrice: i.itemStartingPrice,
        currentPrice: i.itemCurrentPrice,
        endTime: i.itemEndTime,
        imagePath: i.itemImagePath,
        bidId: i.latestBid.id,
        isAuctionLive: i.isAuctionLive,
        isHighest: i.latestBid.isHighest
    }));

    let userId = Number(data.userId);
    console.log(items2);
    console.log(userId);

    // SideBard manage and show sections
    let currentSection = 'dashboard';
    
    function showSection(sectionName: string) {
        currentSection = sectionName;
    }

    onMount(() => {
        showSection('dashboard');
    });

    // My Currently Biddings: Dummy data for demonstration
    let items: Array<any> = items2 || [
        {
            id: 1,
            bidderId: 1,
            title: 'Item 1',
            description: 'Description of Item 1',
            startingPrice: 100,
            currentPrice: 150,
            endTime: '2022-12-31T23:59:59',
            imagePath: '/images/item1.jpg',
            isAuctionLive: true,
            isHighest: 1
        },
        {
            id: 2,
            bidderId: 2,
            title: 'Item 2',
            description: 'Description of Item 2',
            startingPrice: 200,
            currentPrice: 250,
            endTime: '2022-12-31T23:59:59',
            imagePath: '/images/item2.jpg',
            isAuctionLive: true,
            isHighest: 0
        },
        {
            id: 3,
            bidderId: 1,
            title: 'Item 3',
            description: 'Description of Item 3',
            startingPrice: 300,
            currentPrice: 350,
            endTime: '2022-12-31T23:59:59',
            imagePath: '/images/item3.jpg',
            isAuctionLive: true,
            isHighest: 0
        },
        {
            id: 4,
            bidderId: 2,
            title: 'Item 4',
            description: 'Description of Item 4',
            startingPrice: 400,
            currentPrice: 450,
            endTime: '2022-12-31T23:59:59',
            imagePath: '/images/item4.jpg',
            isAuctionLive: true,
            isHighest: 0
        },
        {
            id: 5,
            bidderId: 1,
            title: 'Item 5',
            description: 'Description of Item 5',
            startingPrice: 500,
            currentPrice: 550,
            endTime: '2022-12-31T23:59:59',
            imagePath: '/images/item5.jpg',
            isAuctionLive: false,
            isHighest: 1
        },
        {
            id: 6,
            bidderId: 2,
            title: 'Item 6',
            description: 'Description of Item 6',
            startingPrice: 600,
            currentPrice: 650,
            endTime: '2022-12-31T23:59:59',
            imagePath: '/images/item6.jpg',
            isAuctionLive: false,
            isHighest: 0
        },
        {
            id: 7,
            bidderId: 1,
            title: 'Item 7',
            description: 'Description of Item 7',
            startingPrice: 700,
            currentPrice: 750,
            endTime: '2022-12-31T23:59:59',
            imagePath: '/images/item7.jpg',
            isAuctionLive: false,
            isHighest: 0
        },
        {
            id: 8,
            bidderId: 2,
            title: 'Item 8',
            description: 'Description of Item 8',
            startingPrice: 800,
            currentPrice: 850,
            endTime: '2022-12-31T23:59:59',
            imagePath: '/images/item8.jpg',
            isAuctionLive: false,
            isHighest: 0
        }
    ];

    // User Profile Management & Edit Profile Process
    
    let userProfile = {
        id: userId,
        userName: profile.userName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        address: profile.address,
        dateOfBirth: profile.dateOfBirth,
        profilePicturePath: '/images/profile-picture.jpg'
    };

    let editProfileModalVisible = false;

    function updateProfile() {
        // Call API to update user profile
        console.log('Profile updated:', userProfile);
        editProfileModalVisible = false;
    }

    
</script>

<div class="bidderDash">
    <div class="sidebar">
        <h2>BidNest</h2>
        <ul>
            <li><a on:click={() => showSection('dashboard')}>Dashboard</a></li>
            <li><a on:click={() => showSection('currentlyBidding')}>Currently Bidding</a></li>
            <li><a on:click={() => showSection('wonItems')}>Won Items</a></li>
            <li><a on:click={() => showSection('lostItems')}>Lost Items</a></li>
            <li><a on:click={() => showSection('userProfile')}>User Profile</a></li>
            <li><form action="?/logout" method="post"><input class="inputA" type="submit" value="LogOut"/></form></li>
        </ul>
    </div>
    <div class="main-content">
        <div class="header">
            <h1>Bidder Dashboard</h1>
            <a href="/live-auction" rel="external" class="primary-btn"><i class="fas fa-plus"></i> Go to Live Auctions</a>
        </div>
        {#if currentSection === 'dashboard'}
            <div id="myItemsSection" class="dashboard-section">
                <h1>Welcome, {userProfile.userName}!</h1>
                <h3>My Dashboard</h3>

                <div id="myItemsList" class="item-list">
                    {#each items.slice(0, 5) as item}
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
        {:else if currentSection === 'currentlyBidding'}
            <div id="myItemsSection" class="dashboard-section">
                <h3>My Currently Bidding</h3>
                <div id="myItemsList" class="item-list">
                    {#each items.filter(item => item.isAuctionLive && item.bidderId === userId) as item}
                        <div class="item">
                            <img src="http://localhost:5170{item.imagePath}" alt={item.title}>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                            <p>Starting Price: ${item.startingPrice}</p>
                            <p>Current Price: ${item.currentPrice || item.startingPrice}</p>
                            <p>End Time: {new Date(item.endTime).toLocaleString()}</p>
                            <span class="live-indicator active">Live</span>
                            <div class="item-actions">
                                <form method="POST" action="?/removeBid" enctype="multipart/form-data">
                                    {#if item}
                                        <input type="hidden" name="id" value={item.id} />
                                        <input type="hidden" name="bidId" value={item.bidId} />
                                    {/if}
                                    <button type="submit" class="primary-btn">Remove</button>
                                </form>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {:else if currentSection === 'wonItems'}
            <div id="myItemsSection" class="dashboard-section">
                <h3>My Won Items</h3>
                <div id="myItemsList" class="item-list">
                    {#each items.filter(item => !item.isAuctionLive && item.bidderId === userId && Number(item.isHighest) === 1) as item}
                        <div class="item">
                            <img src="http://localhost:5170{item.imagePath}" alt={item.title}>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                            <p>Starting Price: ${item.startingPrice}</p>
                            <p>Final Price: ${item.currentPrice}</p>
                            <p>End Time: {new Date(item.endTime).toLocaleString()}</p>
                            <span class="live-indicator inactive">Ended</span>
                            <a type="submit" class="primary-btn" style="background-color: brown;" rel="external" href="/payment/{item.bidId}">pay</a>
                        </div>
                    {/each}
                </div>
            </div>
        {:else if currentSection === 'lostItems'}
            <div id="myItemsSection" class="dashboard-section">
                <h3>My Lost Items</h3>
                <div id="myItemsList" class="item-list">
                    {#each items.filter(item => !item.isAuctionLive && item.bidderId === userId && Number(item.isHighest === 0)) as item}
                        <div class="item">
                            <img src="http://localhost:5170{item.imagePath}" alt={item.title}>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                            <p>Starting Price: ${item.startingPrice}</p>
                            <p>Final Price: ${item.currentPrice}</p>
                            <p>End Time: {new Date(item.endTime).toLocaleString()}</p>
                            <span class="live-indicator inactive">Ended</span>
                        </div>
                    {/each}
                </div>
            </div>
        {:else if currentSection === 'userProfile'}
            <div id="userProfileSection" class="dashboard-section container mt-5">
                <h2 class="text-center mb-4">User Profile</h2>
                <div class="card profile-card">
                    <div class="profile-header">
                        <h3>Hi, {userProfile.userName} !</h3>
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        <img src="http://localhost:5170{userProfile.profilePicturePath}" alt="Profile Picture" class="img-fluid profile-picture" />
                    </div>
                    <div class="card-body profile-info">
                        <p><i class="fas fa-user icon"></i><strong>Username:</strong>{userProfile.userName}</p>
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
                            <form method="POST" action="?/updateProfile" enctype="multipart/form-data">
                                {#if userProfile}
                                    <input type="hidden" name="hiddenId" bind:value={userProfile.id} />
                                {/if}
                                <div class="form-group">
                                    <label for="firstName">User Name:</label>
                                    <input type="text" name="userName" bind:value={userProfile.userName} required />
                                </div>
                                <div class="form-group">
                                    <label for="email">Email:</label>
                                    <input type="email" name="email" bind:value={userProfile.email} required />
                                </div>
                                <div class="form-group">
                                    <label for="phoneNumber">Phone Number:</label>
                                    <input type="text" name="phoneNumber" bind:value={userProfile.phoneNumber} required />
                                </div>
                                <div class="form-group">
                                    <label for="address">Address:</label>
                                    <input type="text" name="address" bind:value={userProfile.address} required />
                                </div>
                                <div class="form-group">
                                    <label for="dateOfBirth">Date of Birth:</label>
                                    <input type="datetime-local" name="dateOfBirth" bind:value={userProfile.dateOfBirth} required />
                                </div>
                                <div class="form-group">
                                    <label for="profilePicture">Profile Picture:</label>
                                    <!-- <input type="file" id="profilePicture" name="profilePicture" accept="image/*" on:change={event => {
                                       const file = event.target.files[0];
                                        if (file) {
                                            // Here you would typically upload the file and get the path
                                            // For demonstration, we will just set a placeholder path
                                            userProfile.profilePicturePath = URL.createObjectURL(file);
                                        }
                                    }} /> -->
                                </div>
                                <button type="submit" class="primary-btn">Update Profile</button>
                            </form>
                        </div>
                    </div>
                {/if}
            </div>
        {/if}

        
    </div>
</div>


<style>
    /* Global Styles */
    :root {
        --primary-color: #3498db;
        --secondary-color: #2c3e50;
        --accent-color: #e74c3c;
        --background-color: #ecf0f1;
        --text-color: #34495e;
        --card-background: #ffffff;
        --sidebar-width: 250px;
        --header-height: 60px;
        --border-radius: 8px;
        --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        --transition: all 0.3s ease;
    }

    body {
        font-family: 'Roboto', sans-serif;
        background-color: var(--background-color);
        color: var(--text-color);
        margin: 0;
        padding: 0;
    }

    /* Bidder Dashboard Layout */
    .bidderDash {
        display: flex;
        min-height: 100vh;
    }

    /* Sidebar Styles */
    .sidebar {
        width: var(--sidebar-width);
        background-color: var(--secondary-color);
        color: white;
        padding: 20px;
        box-shadow: var(--box-shadow);
        transition: var(--transition);
    }

    .sidebar h2 {
        font-size: 24px;
        margin-bottom: 30px;
        text-align: center;
        color: var(--primary-color);
    }

    .sidebar ul {
        list-style-type: none;
        padding: 0;
    }

    .sidebar li {
        margin-bottom: 15px;
    }

    .sidebar a {
        color: white;
        text-decoration: none;
        font-size: 16px;
        display: block;
        padding: 10px;
        border-radius: var(--border-radius);
        transition: var(--transition);
    }

    .sidebar a:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateX(5px);
    }

    .sidebar .inputA {
        background-color: transparent;
        width:max-content;
        border: none;
        color: white;
        text-decoration: none;
        font-size: 16px;
        display: block;
        padding: 10px;
        border-radius: var(--border-radius);
        transition: var(--transition);
    }

    .sidebar .inputA:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateX(5px);
    }

    /* Main Content Styles */
    .main-content {
        flex-grow: 1;
        padding: 20px;
        overflow-y: auto;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        background-color: var(--card-background);
        padding: 20px;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
    }

    .header h1 {
        margin: 0;
        font-size: 28px;
        color: var(--secondary-color);
    }

    .primary-btn {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);
        text-decoration: none;
        display: inline-block;
    }

    .primary-btn:hover {
        background-color: #2980b9;
        transform: translateY(-2px);
    }

    /* Dashboard Section Styles */
    .dashboard-section {
        background-color: var(--card-background);
        border-radius: var(--border-radius);
        padding: 20px;
        margin-bottom: 30px;
        box-shadow: var(--box-shadow);
    }

    .dashboard-section h3 {
        margin-top: 0;
        color: var(--secondary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    /* Item List Styles */
    .item-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }

    .item {
        background-color: var(--card-background);
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow);
        transition: var(--transition);
        position: relative;
    }

    .item:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .item img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        transition: var(--transition);
    }

    .item:hover img {
        transform: scale(1.1);
    }

    .item-content {
        padding: 15px;
    }

    .item h4 {
        margin: 0 0 10px;
        font-size: 18px;
        color: var(--secondary-color);
    }

    .item p {
        margin: 5px 0;
        font-size: 14px;
        color: var(--text-color);
    }

    .item-price {
        font-size: 18px;
        font-weight: bold;
        color: var(--primary-color);
        margin: 10px 0;
    }

    .item-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
    }

    .remove-btn {
        background-color: var(--accent-color);
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .remove-btn:hover {
        background-color: #c0392b;
        transform: translateY(-2px);
    }

    .live-indicator {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        margin: 10px 15px;
        position: absolute;
        top: 10px;
        right: 10px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .live-indicator.active {
        background-color: #2ecc71;
        color: white;
    }

    .live-indicator.inactive {
        background-color: var(--accent-color);
        color: white;
    }

    /* User Profile Styles */
    .profile-card {
        background-color: var(--card-background);
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow);
        transition: var(--transition);
    }

    .profile-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }

    .profile-header {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 30px;
        text-align: center;
        position: relative;
        overflow: hidden;
    }

    .profile-header::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
        transform: rotate(45deg);
        z-index: 1;
    }

    .profile-header h3 {
        position: relative;
        z-index: 2;
        font-size: 24px;
        margin-bottom: 10px;
    }

    .profile-picture {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 5px solid white;
        margin-top: 20px;
        position: relative;
        z-index: 2;
        transition: var(--transition);
    }

    .profile-picture:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }

    .profile-info {
        padding: 30px;
    }

    .profile-info p {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
    }

    .profile-info .icon {
        margin-right: 15px;
        color: var(--primary-color);
        font-size: 20px;
        width: 25px;
        text-align: center;
    }

    .btn-edit {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: block;
        width: 100%;
        margin-top: 20px;
    }

    .btn-edit:hover {
        background-color: #2980b9;
        transform: translateY(-2px);
    }

    /* Modal Styles */
    .modal {
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
    }

    .modal-content {
        background-color: var(--card-background);
        padding: 40px;
        border-radius: var(--border-radius);
        max-width: 500px;
        width: 90%;
        position: relative;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        animation: modalAppear 0.3s ease-out
    }

    @keyframes modalAppear {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .close {
        position: absolute;
        right: 20px;
        top: 15px;
        font-size: 28px;
        cursor: pointer;
        color: var(--text-color);
        transition: var(--transition);
    }

    .close:hover {
        color: var(--accent-color);
        transform: rotate(90deg);
    }

    /* Form Styles */
    .form-group {
        margin-bottom: 25px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: var(--secondary-color);
    }

    .form-group input {
        width: 100%;
        padding: 12px;
        border: 2px solid #ddd;
        border-radius: var(--border-radius);
        font-size: 16px;
        transition: var(--transition);
    }

    .form-group input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        outline: none;
    }

    .form-group input[type="file"] {
        border: none;
        padding: 10px 0;
    }

    .form-group input[type="file"]::-webkit-file-upload-button {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);
    }

    .form-group input[type="file"]::-webkit-file-upload-button:hover {
        background-color: #2980b9;
    }


    /* Responsive Styles */
    @media screen and (max-width: 1200px) {
        .container {
            width: 95%;
        }
    }

    @media screen and (max-width: 992px) {
        .dashboard {
            flex-direction: column;
        }

        .profile-section {
            width: 100%;
            margin-bottom: 30px;
        }

        .items-section {
            width: 100%;
        }

        .items-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media screen and (max-width: 768px) {
        .items-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .profile-card {
            max-width: 400px;
            margin: 0 auto;
        }

        .modal-content {
            width: 95%;
            padding: 30px;
        }
    }

    @media screen and (max-width: 576px) {
        .items-grid {
            grid-template-columns: 1fr;
        }

        .item {
            max-width: 300px;
            margin: 0 auto;
        }

        .profile-header {
            padding: 20px;
        }

        .profile-picture {
            width: 120px;
            height: 120px;
        }

        .profile-header h3 {
            font-size: 20px;
        }

        .profile-info {
            padding: 20px;
        }

        .modal-content {
            padding: 20px;
        }

        .form-group input {
            padding: 10px;
            font-size: 14px;
        }

        .btn-edit, .remove-btn {
            padding: 8px 12px;
            font-size: 14px;
        }
    }

    /* Ensure images don't overflow on small screens */
    img {
        max-width: 100%;
        height: auto;
    }

    /* Improve table responsiveness */
    @media screen and (max-width: 600px) {
        table {
            font-size: 14px;
        }

        th, td {
            padding: 8px;
        }
    }

    /* Adjust font sizes for better readability on small screens */
    @media screen and (max-width: 400px) {
        body {
            font-size: 14px;
        }

        h1 {
            font-size: 24px;
        }

        h2 {
            font-size: 20px;
        }

        h3 {
            font-size: 18px;
        }

        h4 {
            font-size: 16px;
        }
    }
</style>