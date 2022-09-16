<script>
    let navbar = [
        {name: "Home", path: "/"},
        {name: "My Project", path: "/project"},
        {name: "About", path: "/about"}
    ];
</script>

<nav class="flex items-center">
    {#each navbar as menu}
        <li class="mr-6"><a href={menu.path} class="text-blue-500 hover:text-blue-800">{menu.name}</a></li>
    {/each}
</nav>

<div class="navbar p-4 flex flex-row w-screen justify-center">
    <img src="" alt="Kucing Garong" /> 
    <ul class="flex flex-row justify-evenly">
        {#each navbar as menu}
            <li class="flex"><a href={menu.path}>{menu.name}</a></li>
        {/each}
    </ul>
</div>

<h1 class="text-3xl font-bold underline text-center">
    Raven Yrcorvine
</h1>