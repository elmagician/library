<script lang='ts' xmlns='http://www.w3.org/1999/html'>
  import {MDBBtn, MDBIcon} from 'mdbsvelte/src/index.js'

  export let id: string = 'selecter'
  export let selected: boolean = false
  export let hidden: boolean = true
  export let toReset: boolean = false
  export let element: object
  export let select: (object) => void

  const innerSelect = (): void => {
    select(element)
  }

  const reset = (): true => {
    selected = false
    toReset = false
    return true
  }

  $: toReset && reset()
</script>

{#if hidden}
  <button id='{id}' on:click={innerSelect} style='display: none !important'></button>
{:else}
  {#if !selected}
    <MDBBtn class='p-2 m-0  w-100' color='amber' on:click={innerSelect}>
      <MDBIcon icon='plus-circle'/>
    </MDBBtn>
  {:else}
    <MDBBtn class='p-2 m-0  w-100' color='dark-green' on:click={innerSelect}>
      <MDBIcon icon='check-circle'/>
    </MDBBtn>
  {/if}
{/if}
