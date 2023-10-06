<script setup>
const loader = ref(null);

const { gsap } = useGsap();
const emitter = useEmitter();

emitter.on('shader:running', () => {
  gsap.to(loader.value, {
    autoAlpha: 0,
    pointerEvents: 'none',
    onComplete: () => emitter.emit('loader:end'),
  });
});
</script>
