/* globals Importer */
Template.adminImport.helpers({
	isAdmin() {
		return RocketChat.authz.hasRole(Meteor.userId(), 'admin');
	},
	isImporters() {
		return Object.keys(Importer.Importers).length > 0;
	},
	getDescription(importer) {
		return TAPi18n.__('Importer_From_Description', {
			from: importer.name
		});
	},
	importers() {
		const importers = [];
		_.each(Importer.Importers, function(importer, key) {
			importer.key = key;
			importers.push(importer);
		});
		return importers;
	}
});

Template.adminImport.events({
	'click .start-import'() {
		const importer = this;
		Meteor.call('setupImporter', importer.key, function(error) {
			if (error) {
				console.log(t('importer_setup_error'), importer.key, error);
				return handleError(error);
			} else {
				FlowRouter.go(`/admin/import/prepare/${ importer.key }`);
			}
		});
	}
});
