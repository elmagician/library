<script lang='ts'>
  import {RemoveToast, toasts} from '../../stores/toast'
</script>

<style lang='scss'>
  $end-opacity: 0.7;
  $toast-success-bg: rgba(48, 128, 79, 0.84);
  $toast-error-bg: rgba(153, 3, 22, 0.84);
  $text-color: #fff;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: $end-opacity;
    }
  }

  .container {
    width: 400px;
    max-width: 40vw;
    position: fixed;
    right: 0;
    top: 0;
    padding: 20px;
    z-index: 2000;
  }

  .toast {
    padding: 20px;
    border-radius: 5px;
    color: $text-color;
    margin-bottom: 10px;
    animation: fadeIn ease 3s;
    opacity: $end-opacity;
    z-index: 2000;

    &.success {
      background-color: $toast-success-bg !important;
      border: 1px solid $toast-success-bg !important;
    }

    &.error {
      background-color: $toast-error-bg;
      border: 1px solid $toast-error-bg;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .hidden {
    display: none !important;
  }
</style>

<div class='container {$toasts.length > 0 ? "" : "hidden"}'>
  {#each $toasts as toast }
    {#if toast.isError}
      <div class='toast error' on:click={() => RemoveToast(toast)}>{toast.message}</div>
    {:else}
      <div class='toast success' on:click={() => RemoveToast(toast)}>{toast.message}</div>
    {/if}
  {/each}
</div>
