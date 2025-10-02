#!/usr/bin/env node

/**
 * Validates TWA (Trusted Web Activity) readiness
 * Checks manifest, icons, and configuration
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating TWA Configuration...\n');

let errors = 0;
let warnings = 0;

// Check manifest.json
console.log('📄 Checking manifest.json...');
const manifestPath = path.join(__dirname, '../public/manifest.json');
if (!fs.existsSync(manifestPath)) {
    console.error('❌ manifest.json not found!');
    errors++;
} else {
    try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        
        // Check required fields
        const requiredFields = ['name', 'short_name', 'start_url', 'display', 'icons'];
        requiredFields.forEach(field => {
            if (!manifest[field]) {
                console.error(`❌ Missing required field: ${field}`);
                errors++;
            } else {
                console.log(`  ✓ ${field}: ${typeof manifest[field] === 'object' ? 'present' : manifest[field]}`);
            }
        });

        // Check display mode
        if (manifest.display && manifest.display !== 'standalone' && manifest.display !== 'fullscreen') {
            console.warn(`  ⚠️  Display mode "${manifest.display}" - recommend "standalone" for TWA`);
            warnings++;
        }

        // Check icons
        if (manifest.icons && Array.isArray(manifest.icons)) {
            const has192 = manifest.icons.some(icon => icon.sizes === '192x192');
            const has512 = manifest.icons.some(icon => icon.sizes === '512x512');
            const hasMaskable = manifest.icons.some(icon => icon.purpose && icon.purpose.includes('maskable'));
            
            if (!has192) {
                console.error('  ❌ Missing 192x192 icon');
                errors++;
            }
            if (!has512) {
                console.error('  ❌ Missing 512x512 icon');
                errors++;
            }
            if (!hasMaskable) {
                console.warn('  ⚠️  No maskable icons - recommended for Android adaptive icons');
                warnings++;
            }
            console.log(`  ✓ Found ${manifest.icons.length} icons`);
        }

        // Check theme colors
        if (!manifest.theme_color) {
            console.warn('  ⚠️  theme_color not set');
            warnings++;
        }
        if (!manifest.background_color) {
            console.warn('  ⚠️  background_color not set');
            warnings++;
        }

    } catch (e) {
        console.error(`❌ Error parsing manifest.json: ${e.message}`);
        errors++;
    }
}

// Check assetlinks.json
console.log('\n🔗 Checking assetlinks.json...');
const assetlinksPath = path.join(__dirname, '../public/.well-known/assetlinks.json');
if (!fs.existsSync(assetlinksPath)) {
    console.error('❌ assetlinks.json not found!');
    errors++;
} else {
    try {
        const assetlinks = JSON.parse(fs.readFileSync(assetlinksPath, 'utf8'));
        if (!Array.isArray(assetlinks) || assetlinks.length === 0) {
            console.error('❌ assetlinks.json is empty or invalid');
            errors++;
        } else {
            const link = assetlinks[0];
            if (link.target && link.target.sha256_cert_fingerprints) {
                const fingerprint = link.target.sha256_cert_fingerprints[0];
                if (fingerprint && fingerprint.includes('REPLACE')) {
                    console.warn('  ⚠️  SHA256 fingerprint not configured (still using placeholder)');
                    warnings++;
                } else {
                    console.log('  ✓ SHA256 fingerprint configured');
                }
            }
            console.log(`  ✓ Package name: ${link.target.package_name}`);
        }
    } catch (e) {
        console.error(`❌ Error parsing assetlinks.json: ${e.message}`);
        errors++;
    }
}

// Check for icons
console.log('\n🖼️  Checking icons...');
const iconDir = path.join(__dirname, '../public/img/manifest');
if (!fs.existsSync(iconDir)) {
    console.error('❌ Icon directory not found: /public/img/manifest');
    errors++;
} else {
    const requiredSizes = ['192x192', '512x512'];
    requiredSizes.forEach(size => {
        const iconPath = path.join(iconDir, `${size}.png`);
        if (!fs.existsSync(iconPath)) {
            console.error(`  ❌ Missing icon: ${size}.png`);
            errors++;
        } else {
            const stats = fs.statSync(iconPath);
            console.log(`  ✓ ${size}.png (${(stats.size / 1024).toFixed(2)} KB)`);
        }
    });
}

// Check service worker
console.log('\n⚙️  Checking service worker...');
const swPath = path.join(__dirname, '../public/service-worker.js');
if (!fs.existsSync(swPath)) {
    console.warn('⚠️  service-worker.js not found');
    warnings++;
} else {
    console.log('  ✓ service-worker.js present');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Summary:');
if (errors === 0 && warnings === 0) {
    console.log('✅ All checks passed! Your app is TWA-ready!');
} else {
    if (errors > 0) {
        console.log(`❌ ${errors} error(s) found - must be fixed for TWA`);
    }
    if (warnings > 0) {
        console.log(`⚠️  ${warnings} warning(s) - recommended to fix`);
    }
}
console.log('='.repeat(50));

process.exit(errors > 0 ? 1 : 0);
