<template>
    <div id="scatter">
    </div>
</template>

<script>
    import * as d3 from 'd3'
    import {buildModel, train, reduce} from './dimreduction'
    import * as tf from '@tensorflow/tfjs'


    export default {
        name: "Scatter",
        props: ["ideas"],
        data: () => {
            return {

            }
        },
        computed: {
            embedded: async () => {
                const data = tf.randomUniform([10,300]);
                return buildModel().then((model) =>{
                    return train(model, data).then((trained) =>{
                        return reduce(model, trained, data).then((it) => {
                            return it.arraySync()
                        })
                    })
                })
            }
        },
        mounted: async function() {

            var svg = d3.select("#scatter")
                .append("div")
                .classed("svg-container", true) //container class to make it responsive
                .append("svg")
                //responsive SVG needs these 2 attributes and no width and height attr
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "-50 0 600 400")
                //class to make it responsive
                .classed("svg-content-responsive", true);
            var margin = {top: 10, right: 30, bottom: 30, left: 60},
                width = 600 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            //Read the data
            var x = d3.scaleLinear()
                .domain([0, 4])
                .range([ 0, width ]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, 4])
                .range([ height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            let data = await this.embedded;
            // eslint-disable-next-line no-console
            console.log(this.embedded)

            svg.selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) {return x(d[0]); } )
                .attr("cy", function (d) { return y(d[1]); } )
                .attr("r", 3.0)
                .style("fill", "#69b3a2")

        }
    }

</script>

<style scoped>
    .svg-container {
        display: inline-block;
        position: relative;
        height: 100%;
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