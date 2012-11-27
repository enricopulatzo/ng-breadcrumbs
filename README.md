ng-breadcrumbs
==============

Combines Angular and Bootstrap's breadcrumbs into a useful directive + service.

What the directive does:

		Given the following markup: <ul bread-crumbs id='myBreadCrumbs'></ul>
		renders whatever breadcrumbs were registered in the id "myBreadCrumbs"

	service:

		Provides a method to manipulate breadcrumbs

			BreadCrumbsService.push(
				"myBreadCrumbs",
				{
					label: "Something",
					href: "http://example.com/foo",
					title: "optional",
					clickHandler: <callback>
				}
			);

Clicking on a breadcrumb link will remove handle the unregistering of breadcrumbs that come after the link one clicks on.
