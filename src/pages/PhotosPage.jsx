{/* UNIFIED PAPERCUT SCENE ANCHOR */}
<group position={[0, -2.75, 0]}>
  
  {/* LAYER 2: BACKGROUND PAPERCUT CLOUDS - Light coral pinkish-red base */}
  <VectorCloudLayer
    zPos={-2.5}
    solidColor="#e04c63" // Brighter, light neon coral
    shadowOpacity={0.2}
    parallaxFactor={0.15}
    seed={5.2}
  />
  {/* LAYER 3: MID-BACK PAPERCUT CLOUDS - Balanced ruby red */}
  <VectorCloudLayer
    zPos={-0.8}
    solidColor="#d92b4b" // Clean, mid-tone radiant ruby
    shadowOpacity={0.28}
    parallaxFactor={0.35}
    seed={3.4}
  />
  {/* LAYER 4: MID-FRONT PAPERCUT CLOUDS - Rich rich crimson */}
  <VectorCloudLayer
    zPos={0.8}
    solidColor="#bd1534" // Deeper core red to stabilize midground depth
    shadowOpacity={0.35}
    parallaxFactor={0.6}
    seed={1.8}
  />
  {/* LAYER 5: ABSOLUTE FOREGROUND - Ultra-bright glowing translucent rose */}
  <VectorCloudLayer
    zPos={2.2}
    solidColor="#ff4d6d" // Pop highlight pink-rose for front lens flare clarity
    opacity={0.6}
    parallaxFactor={0.85}
    seed={0.6}
  />
</group>