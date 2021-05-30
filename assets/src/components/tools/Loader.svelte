<script lang='ts'>
  import {MDBSpinner} from 'mdbsvelte/src/index.js'

  export let loading: boolean = false
  export let loader: string = 'loader'
  export const type: string = 'grow'
  export const color: string = 'success'
</script>
<style type='text/css'>
  :global(.loader) {
    position: fixed !important;
    left: 50% !important;
    top: 50% !important;
  }

  :global(.waiting) {
    position: fixed !important;
    left: 50% !important;
    top: 1rem !important;
    z-index: 2000 !important;
  }
</style>
{#if loading}
  <MDBSpinner class='{loader}' color='{color}' type='{type}'/>
{/if}
