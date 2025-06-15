/* ============================================================
   FHIR R4 Documentation Portal — Main JavaScript
   Vanilla JS — no frameworks or dependencies required.
   ============================================================ */

/**
 * Highlight the current page's navigation link based on the URL path.
 * Looks at both the main nav (`.main-nav a`) and sidebar nav (`.sidebar-nav a`).
 */
function highlightNav() {
  const currentPath = location.pathname;

  document.querySelectorAll('.main-nav a, .sidebar-nav a').forEach(function (link) {
    link.classList.remove('active');

    const href = link.getAttribute('href');
    if (!href) return;

    if (
      href === currentPath ||
      (currentPath.startsWith(href) && href !== '/' && href !== '') ||
      (href === '/' && currentPath === '/')
    ) {
      if (href === '/' && currentPath !== '/') return;
      link.classList.add('active');
    }
  });

  // Highlight Research dropdown parent when on a line page
  if (currentPath.match(/^\/(line[123])\//)) {
    var dd = document.querySelector('.nav-dropdown');
    if (dd) dd.classList.add('active');
  }
}

/* ============================================================
   ARTIFACT TYPE BADGES
   ============================================================ */

/**
 * Map of FHIR artifact type names to badge CSS classes and labels.
 */
var ARTIFACT_BADGES = {
  // Core FHIR resource types
  'StructureDefinition':  { cls: 'badge-teal',  label: 'Profile' },
  'StructureMap':         { cls: 'badge',       label: 'StructureMap', custom: 'color:#a855f7;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.25)' },
  'ConceptMap':           { cls: 'badge',       label: 'ConceptMap',   custom: 'color:#16a34a;background:rgba(22,163,74,0.12);border:1px solid rgba(22,163,74,0.25)' },
  'CodeSystem':           { cls: 'badge-amber', label: 'CodeSystem' },
  'ValueSet':             { cls: 'badge-teal',  label: 'ValueSet',     custom: 'color:#0d9488;background:rgba(13,148,136,0.12);border:1px solid rgba(13,148,136,0.25)' },
  'OperationDefinition':  { cls: 'badge-red',   label: 'Operation' },
  'CapabilityStatement':  { cls: 'badge',       label: 'Capability',  custom: 'color:#7c3aed;background:rgba(124,58,237,0.10);border:1px solid rgba(124,58,237,0.22)' },
  'ImplementationGuide':  { cls: 'badge-gray',  label: 'IG' },
  'NamingSystem':         { cls: 'badge-amber', label: 'NamingSystem' },
  'SearchParameter':      { cls: 'badge',       label: 'SearchParam', custom: 'color:#0891b2;background:rgba(8,145,178,0.12);border:1px solid rgba(8,145,178,0.25)' },
  'Observation':          { cls: 'badge-amber', label: 'Observation' },
  'Patient':              { cls: 'badge-teal',  label: 'Patient' },
  'DiagnosticReport':     { cls: 'badge-red',   label: 'DiagnosticReport' },
  'ServiceRequest':       { cls: 'badge-amber', label: 'ServiceRequest' },
  'Condition':            { cls: 'badge-gray',  label: 'Condition' },
  'Procedure':            { cls: 'badge-teal',  label: 'Procedure' },
  'MedicationRequest':    { cls: 'badge-red',   label: 'MedicationRequest' },
  'MedicationStatement':  { cls: 'badge-amber', label: 'MedicationStatement' },
  'AllergyIntolerance':   { cls: 'badge-red',   label: 'Allergy' },
  'Encounter':            { cls: 'badge-teal',  label: 'Encounter' },
  // Catch-all for unknown types
  '_default':             { cls: 'badge-gray',  label: 'Artifact' }
};

/**
 * Return the HTML string for a colored type badge given an artifact type name.
 *
 * @param {string} type - FHIR artifact type (e.g. "StructureDefinition", "ConceptMap")
 * @returns {string} HTML for a <span class="badge ..."> element
 */
function getArtifactTypeBadge(type) {
  var config = ARTIFACT_BADGES[type] || ARTIFACT_BADGES['_default'];
  var badgeClass = config.cls;
  var label = config.label;
  var extraStyle = config.custom || '';

  var html = '<span class="badge ' + badgeClass + '"';
  if (extraStyle) {
    html += ' style="' + extraStyle + '"';
  }
  html += '>' + label + '</span>';
  return html;
}

/* ============================================================
   ARTIFACT FILTERING (Artifact Explorer Page)
   ============================================================ */

/**
 * Initialize artifact filter buttons that filter cards by type.
 * Expected HTML:
 *   <button class="filter-btn" data-filter="all">All</button>
 *   <button class="filter-btn" data-filter="StructureDefinition">Profiles</button>
 *   ...
 *   <div class="artifact-card" data-type="StructureDefinition">...</div>
 */
function initArtifactFilters() {
  var filterButtons = document.querySelectorAll('.filter-btn');
  if (!filterButtons.length) return;

  var artifactCards = document.querySelectorAll('.artifact-card');
  if (!artifactCards.length) return;

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active state on buttons
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter') || 'all';
      var searchValue = '';

      // Check if there is an active search input value
      var searchInput = document.querySelector('.search-input');
      if (searchInput) {
        searchValue = searchInput.value.trim().toLowerCase();
      }

      artifactCards.forEach(function (card) {
        var cardType = card.getAttribute('data-type') || '';
        var matchesFilter = filter === 'all' || cardType === filter;

        // If a search term is active, also check the card's text content
        var matchesSearch = true;
        if (searchValue) {
          var cardText = (card.textContent || '').toLowerCase();
          var cardKeywords = card.getAttribute('data-keywords') || '';
          matchesSearch = cardText.indexOf(searchValue) !== -1 ||
                          cardKeywords.toLowerCase().indexOf(searchValue) !== -1;
        }

        if (matchesFilter && matchesSearch) {
          card.style.display = '';
          card.classList.remove('is-hidden');
        } else {
          card.style.display = 'none';
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* ============================================================
   SEARCH (Artifact Explorer Page)
   ============================================================ */

/**
 * Initialize real-time search on the artifact explorer.
 * Expected HTML:
 *   <input class="search-input" type="text" placeholder="Search artifacts..." />
 *   <div class="artifact-card" data-type="..." data-keywords="...">...</div>
 */
function initSearch() {
  var searchInput = document.querySelector('.search-input');
  if (!searchInput) return;

  var artifactCards = document.querySelectorAll('.artifact-card');

  searchInput.addEventListener('input', function () {
    var query = this.value.trim().toLowerCase();
    var activeFilter = document.querySelector('.filter-btn.active');
    var filter = activeFilter ? activeFilter.getAttribute('data-filter') || 'all' : 'all';

    artifactCards.forEach(function (card) {
      var cardType = card.getAttribute('data-type') || '';
      var matchesFilter = filter === 'all' || cardType === filter;

      var matchesSearch = true;
      if (query) {
        var cardText = (card.textContent || '').toLowerCase();
        var cardKeywords = card.getAttribute('data-keywords') || '';
        matchesSearch = cardText.indexOf(query) !== -1 ||
                        cardKeywords.toLowerCase().indexOf(query) !== -1;
      }

      if (matchesFilter && matchesSearch) {
        card.style.display = '';
        card.classList.remove('is-hidden');
      } else {
        card.style.display = 'none';
        card.classList.add('is-hidden');
      }
    });
  });
}

/* ============================================================
   TAB SWITCHING (Artifact Detail Pages)
   ============================================================ */

/**
 * Initialize tab switching on artifact detail pages.
 * Expected HTML:
 *   <div class="tabs">
 *     <button class="tab active" data-tab="human">Human Explanation</button>
 *     <button class="tab" data-tab="json">View JSON</button>
 *     <button class="tab" data-tab="fsh">View FSH Source</button>
 *   </div>
 *   <div class="tab-panel active" data-tab="human">...</div>
 *   <div class="tab-panel" data-tab="json">...</div>
 *   <div class="tab-panel" data-tab="fsh">...</div>
 */
function initTabs() {
  var tabGroups = document.querySelectorAll('.tabs');

  tabGroups.forEach(function (tabContainer) {
    var tabs = tabContainer.querySelectorAll('.tab');
    if (!tabs.length) return;

    // Find the associated panels — they should be siblings or next sibling elements
    var parent = tabContainer.parentElement;
    var panels = parent ? parent.querySelectorAll('.tab-panel') : [];

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var tabName = tab.getAttribute('data-tab');
        if (!tabName) return;

        // Deactivate all tabs in this group
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        // Show/hide the matching panels
        panels.forEach(function (panel) {
          var panelName = panel.getAttribute('data-tab');
          if (panelName === tabName) {
            panel.classList.add('active');
            panel.style.display = '';
          } else {
            panel.classList.remove('active');
            panel.style.display = 'none';
          }
        });
      });
    });

    // Ensure only the initially active tab's panel is visible
    var activeTab = tabContainer.querySelector('.tab.active');
    if (activeTab) {
      // Trigger click to set initial state cleanly
      // But avoid infinite loops — just set display directly
      var activeTabName = activeTab.getAttribute('data-tab');
      panels.forEach(function (panel) {
        if (panel.getAttribute('data-tab') === activeTabName) {
          panel.classList.add('active');
          panel.style.display = '';
        } else {
          panel.classList.remove('active');
          panel.style.display = 'none';
        }
      });
    }
  });
}

/* ============================================================
   COPY-TO-CLIPBOARD BUTTONS
   ============================================================ */

/**
 * Initialize copy buttons that copy adjacent code block content to clipboard.
 * Expected HTML:
 *   <button class="copy-btn" data-copy-target="json-viewer-1">Copy</button>
 *   <div id="json-viewer-1" class="json-viewer">...</div>
 *
 * Or, if no data-copy-target is set, copies the preceding/preceding-sibling code block.
 */
function initCopyButtons() {
  var copyButtons = document.querySelectorAll('.copy-btn');
  if (!copyButtons.length) return;

  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-copy-target');
      var targetElement;

      if (targetId) {
        targetElement = document.getElementById(targetId);
      } else {
        // Find the nearest code block: previous sibling, or the closest .json-viewer / .code-block
        var previous = btn.previousElementSibling;
        if (previous && (previous.classList.contains('json-viewer') || previous.classList.contains('code-block'))) {
          targetElement = previous;
        } else {
          targetElement = btn.parentElement.querySelector('.json-viewer, .code-block');
        }
      }

      if (!targetElement) {
        console.warn('Copy button: no target code block found', btn);
        return;
      }

      var textToCopy = targetElement.textContent || '';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(function () {
          // Provide brief visual feedback
          var originalText = btn.textContent || btn.innerText;
          btn.textContent = 'Copied!';
          btn.disabled = true;
          setTimeout(function () {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 2000);
        }).catch(function (err) {
          console.error('Failed to copy text: ', err);
          // Fallback to the legacy method
          fallbackCopy(textToCopy, btn);
        });
      } else {
        // Fallback for older browsers / insecure contexts
        fallbackCopy(textToCopy, btn);
      }
    });
  });
}

/**
 * Fallback clipboard copy using a temporary textarea element.
 *
 * @param {string} text - Text to copy
 * @param {HTMLElement} btn - The button that was clicked (for feedback)
 */
function fallbackCopy(text, btn) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    var successful = document.execCommand('copy');
    if (successful) {
      var originalText = btn.textContent || btn.innerText;
      btn.textContent = 'Copied!';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    } else {
      console.error('Fallback copy failed');
    }
  } catch (err) {
    console.error('Fallback copy error: ', err);
  }

  document.body.removeChild(textarea);
}

/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */

/**
 * Initialize the hamburger-style mobile menu toggle.
 * Expected HTML:
 *   <button class="menu-toggle" aria-label="Toggle navigation menu">
 *     <span></span><span></span><span></span>
 *   </button>
 *   <nav class="main-nav">...</nav>
 */
function initMobileMenu() {
  var menuToggle = document.querySelector('.menu-toggle');
  if (!menuToggle) return;

  var mainNav = document.querySelector('.main-nav');

  menuToggle.addEventListener('click', function () {
    if (mainNav) {
      mainNav.classList.toggle('open');
    }
    // Toggle aria-expanded on the button for accessibility
    var expanded = menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
    menuToggle.setAttribute('aria-expanded', expanded);
  });

  // Close the menu when a navigation link is clicked (on mobile)
  if (mainNav) {
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ============================================================
   INIT ON DOM CONTENT LOADED
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  highlightNav();
  initArtifactFilters();
  initSearch();
  initTabs();
  initCopyButtons();
  initMobileMenu();
});
