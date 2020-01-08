<template>
    <div id="scatter">
    </div>
</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: "Scatter",
        props: ["ideas"],
        data: () => {
            return {

            }
        },
        mounted() {
            d3.select("scatter")
                .append("div")
                .classed("svg-container", true) //container class to make it responsive
                .append("svg")
                //responsive SVG needs these 2 attributes and no width and height attr
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 600 400")
                //class to make it responsive
                .classed("svg-content-responsive", true);
        }
    }
</script>

<style scoped>
    .svg-container {
        display: inline-block;
        position: relative;
        width: 100%;
        padding-bottom: 100%; /* aspect ratio */
        vertical-align: top;
        overflow: hidden;
    }
    .svg-content-responsive {
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 0;
    }
</style>