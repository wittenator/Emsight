<template>
    <v-expansion-panels accordion>
        <v-expansion-panel
                v-for="(item) in ideas"
                :key="item.id"
        >
            <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>
            <v-expansion-panel-content>
                {{item.completed}}
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    export default {
        name: "List",
        props: ["ideas"]
    }
</script>

<style scoped>

</style>