<template>
    <v-data-table
            :headers="headers"
            :items="ideas"
            single-expand
            :expanded.sync="expanded"
            show-expand
            loading="ideas.length == 0 ? true : false"
            loading-text="Loading... Please wait"
            disable-pagination
            hide-default-footer
    >
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">{{item.description}}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "List",
        props: ["ideas"],
        data: () => {
            return {
                expanded: [],
                singleExpand: false,
                headers: [
                    {
                        text: 'Title',
                        align: 'left',
                        sortable: false,
                        value: 'title',
                    },
                    { text: 'Department', value: 'department' },
                ],
            }
        }
    }
</script>

<style scoped>

</style>