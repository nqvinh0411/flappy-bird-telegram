import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hàm đọc kích thước PNG từ header
function getPNGDimensions(filePath) {
    const buffer = fs.readFileSync(filePath);
    
    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    if (buffer[0] !== 0x89 || buffer[1] !== 0x50 || buffer[2] !== 0x4E || buffer[3] !== 0x47) {
        throw new Error('Not a valid PNG file');
    }
    
    // IHDR chunk starts at byte 16
    // Width: bytes 16-19 (big-endian)
    // Height: bytes 20-23 (big-endian)
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    
    return { width, height };
}

const spritesToMeasure = [
    // Birds
    { path: 'public/assets/Player/StyleBird1/Bird1-1.png', name: 'Bird Style 1-1', frames: 4, layout: 'horizontal' },
    { path: 'public/assets/Player/StyleBird1/Bird1-2.png', name: 'Bird Style 1-2', frames: 4, layout: 'horizontal' },
    { path: 'public/assets/Player/StyleBird1/Bird1-3.png', name: 'Bird Style 1-3', frames: 4, layout: 'horizontal' },
    { path: 'public/assets/Player/StyleBird1/Bird1-4.png', name: 'Bird Style 1-4', frames: 4, layout: 'horizontal' },
    { path: 'public/assets/Player/StyleBird2/Bird2-1.png', name: 'Bird Style 2-1', frames: 4, layout: 'horizontal' },
    
    // Pipes
    { path: 'public/assets/Style 1/Pipes-1.png', name: 'Pipes Style 1', frames: { cols: 4, rows: 3 }, layout: 'grid' },
    { path: 'public/assets/Style 2/Pipes-2.png', name: 'Pipes Style 2', frames: { cols: 4, rows: 3 }, layout: 'grid' },
    
    // Tiles
    { path: 'public/assets/Style 1/Tiles-1.png', name: 'Ground Tiles Style 1', frames: 2, layout: 'vertical' },
    { path: 'public/assets/Style 2/Tile-2.png', name: 'Ground Tiles Style 2', frames: 2, layout: 'vertical' },
    
    // Tilesets
    { path: 'public/assets/Style 1/Tileset-1.png', name: 'Tileset Style 1', layout: 'complex' },
    { path: 'public/assets/Style 2/Tileset-2.png', name: 'Tileset Style 2', layout: 'complex' },
];

console.log('='.repeat(80));
console.log('SPRITE SHEET MEASUREMENTS');
console.log('='.repeat(80));
console.log();

const results = [];

spritesToMeasure.forEach(sprite => {
    const fullPath = path.join(__dirname, sprite.path);
    
    if (!fs.existsSync(fullPath)) {
        console.log(`❌ ${sprite.name}: File not found`);
        return;
    }
    
    try {
        const dimensions = getPNGDimensions(fullPath);
        const result = {
            name: sprite.name,
            path: sprite.path,
            totalWidth: dimensions.width,
            totalHeight: dimensions.height,
            layout: sprite.layout
        };
        
        // Calculate frame dimensions
        if (sprite.layout === 'horizontal' && sprite.frames) {
            result.frameWidth = Math.floor(dimensions.width / sprite.frames);
            result.frameHeight = dimensions.height;
            result.frameCount = sprite.frames;
        } else if (sprite.layout === 'vertical' && sprite.frames) {
            result.frameWidth = dimensions.width;
            result.frameHeight = Math.floor(dimensions.height / sprite.frames);
            result.frameCount = sprite.frames;
        } else if (sprite.layout === 'grid' && sprite.frames) {
            result.frameWidth = Math.floor(dimensions.width / sprite.frames.cols);
            result.frameHeight = Math.floor(dimensions.height / sprite.frames.rows);
            result.cols = sprite.frames.cols;
            result.rows = sprite.frames.rows;
            result.frameCount = sprite.frames.cols * sprite.frames.rows;
        }
        
        results.push(result);
        
        console.log(`✅ ${sprite.name}`);
        console.log(`   Total Size: ${dimensions.width}x${dimensions.height}px`);
        if (result.frameWidth) {
            console.log(`   Frame Size: ${result.frameWidth}x${result.frameHeight}px`);
            console.log(`   Frame Count: ${result.frameCount}`);
            if (result.cols) {
                console.log(`   Grid Layout: ${result.cols} cols x ${result.rows} rows`);
            }
        }
        console.log();
        
    } catch (error) {
        console.log(`❌ ${sprite.name}: ${error.message}`);
        console.log();
    }
});

// Save results to JSON
const outputPath = path.join(__dirname, 'src/config/spriteConfig.json');
const outputDir = path.dirname(outputPath);

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

console.log('='.repeat(80));
console.log(`✅ Configuration saved to: ${outputPath}`);
console.log('='.repeat(80));
