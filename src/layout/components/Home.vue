<template>
    <div>
        <TheHeading/>
        <div style="display: flex">
            <router-view style="flex: 1"/>
        </div>
    </div>
</template>

<script>
    import TheHeading from "./nav/TheHeading";

    export default {
        name: "Home",
        components: {
            TheHeading,
        },
    }
</script>

<style scoped>

</style>