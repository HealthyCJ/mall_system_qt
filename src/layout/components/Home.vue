<template>
    <div>
        <TheHeading/>
        <div style="display: flex">
            <router-view style="flex: 1"/>
        </div>
        <!--<End/>-->
    </div>
</template>

<script>
    import TheHeading from "./nav/TheHeading";
    // import End from "./nav/End";

    export default {
        name: "Home",
        components: {
            TheHeading,
            // End,
        },
    }
</script>

<style scoped>

</style>