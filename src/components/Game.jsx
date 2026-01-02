import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import StartScene from '../scenes/StartScene';
import GameScene from '../scenes/GameScene';
import GameOverScene from '../scenes/GameOverScene';
import GAME_CONFIG from '../config/gameConfig';

function Game({ telegramUser }) {
  const gameRef = useRef(null);
  const phaserGameRef = useRef(null);

  useEffect(() => {
    if (phaserGameRef.current) return;

    const config = {
      type: Phaser.WEBGL,
      width: GAME_CONFIG.width,
      height: GAME_CONFIG.height,
      parent: gameRef.current,
      backgroundColor: '#4ec0ca',
      pixelArt: false,
      antialias: true,
      antialiasGL: true,
      roundPixels: false,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: GAME_CONFIG.physics.gravity },
          debug: false,
        },
      },
      scene: [StartScene, GameScene, GameOverScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GAME_CONFIG.width,
        height: GAME_CONFIG.height,
      },
      render: {
        antialias: true,
        antialiasGL: true,
        mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
        roundPixels: false,
        pixelArt: false,
        powerPreference: 'high-performance',
      },
    };

    phaserGameRef.current = new Phaser.Game(config);

    if (telegramUser) {
      phaserGameRef.current.registry.set('telegramUser', telegramUser);
    }

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (phaserGameRef.current && telegramUser) {
      phaserGameRef.current.registry.set('telegramUser', telegramUser);
    }
  }, [telegramUser]);

  return <div ref={gameRef} style={{ width: '100%', height: '100%' }} />;
}

export default Game;
